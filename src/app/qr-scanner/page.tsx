
"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { AuthGuard } from '@/components/auth-guard';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// A custom hook to decode QR codes
const useQrDecoder = (
  onDecode: (result: string) => void,
  onError: (error: string) => void
) => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    // Initialize the worker. The worker script must be in the `public` folder.
    workerRef.current = new Worker('/qr-worker.js');

    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'DECODE_RESULT') {
        if (e.data.data) {
          onDecode(e.data.data);
        }
      } else if (e.data.type === 'DECODE_ERROR') {
        onError(e.data.error);
      }
    };

    workerRef.current.addEventListener('message', handleMessage);

    // Terminate the worker on component unmount
    return () => {
      workerRef.current?.removeEventListener('message', handleMessage);
      workerRef.current?.terminate();
    };
  }, [onDecode, onError]);

  const decodeFromImageData = (imageData: ImageData) => {
    workerRef.current?.postMessage({
      type: 'DECODE_IMAGE',
      imageData,
    });
  };
  
  const decodeFromFile = (file: File) => {
     const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            decodeFromImageData(imageData);
          } else {
            onError('Could not get canvas context.');
          }
        };
        image.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
  }

  return { decodeFromImageData, decodeFromFile };
};


export default function QRScannerPage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanActive, setScanActive] = useState(false);

  const handleScanResult = (url: string) => {
    if (url) {
      try {
        setScanActive(false); // Stop scanning on success
        const path = new URL(url).pathname;
        if (path.startsWith('/products/')) {
          router.push(path);
        } else {
          toast({
            variant: 'destructive',
            title: 'Invalid QR Code',
            description: 'This QR code does not lead to a valid product page.',
          });
          setScanActive(true);
        }
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Invalid URL',
          description: 'The scanned QR code contains an invalid URL.',
        });
        setScanActive(true);
      }
    }
  };
  
  const handleScanError = (error: string) => {
    // We only want to show toasts for actual errors, not for "not found" which happens every frame.
    if (error && !error.toLowerCase().includes('not found')) {
      console.error('QR Scan Error:', error);
      toast({
          variant: 'destructive',
          title: 'Scan Error',
          description: 'Could not scan the QR code. Please try again.',
      });
    }
  }

  const { decodeFromImageData, decodeFromFile } = useQrDecoder(handleScanResult, handleScanError);
  
  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setScanActive(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    return () => {
        // Stop camera stream on component unmount
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  useEffect(() => {
    let animationFrameId: number;

    const scan = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          decodeFromImageData(imageData);
        }
      }
      if (scanActive) {
        animationFrameId = requestAnimationFrame(scan);
      }
    };

    if (scanActive && hasCameraPermission) {
        animationFrameId = requestAnimationFrame(scan);
    }
    
    return () => {
        cancelAnimationFrame(animationFrameId);
    }

  }, [scanActive, hasCameraPermission, decodeFromImageData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        decodeFromFile(file);
    }
  }

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-background">
          <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to dashboard
              </Link>
            </Button>

            <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-lg border">
              <h1 className="text-3xl font-headline font-bold text-center mb-2">Scan Fabric QR Code</h1>
              <p className="text-muted-foreground text-center mb-6">
                Point your camera at a QR code or upload an image to view details.
              </p>

              <div className="relative aspect-square w-full rounded-md overflow-hidden bg-muted flex items-center justify-center">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                 <canvas ref={canvasRef} style={{ display: 'none' }} />
                 {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <p className="text-white text-center p-4">Camera access is required to scan QR codes.</p>
                    </div>
                 )}
              </div>
              
              {hasCameraPermission === false && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Camera Access Denied</AlertTitle>
                    <AlertDescription>
                      Please allow camera access in your browser settings to use the scanner. You can still upload an image.
                    </AlertDescription>
                  </Alert>
              )}

               <div className="mt-4 text-center text-muted-foreground">
                Or
              </div>

              <Button asChild variant="outline" className="w-full mt-4">
                <label htmlFor="qr-upload" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload QR Code Image
                  <input
                    id="qr-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileUpload}
                  />
                </label>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
