
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import QrScanner from 'react-qr-scanner';
import Header from '@/components/header';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CameraOff } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AuthGuard } from '@/components/auth-guard';

export default function QRScannerPage() {
  const { loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported in this browser.');
        setHasCameraPermission(false);
         toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support camera access.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
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

  const handleScan = (result: any) => {
    if (!!result) {
      const url = result?.text;
      if (url) {
        try {
          const path = new URL(url).pathname;
          // Assuming the QR code URL is like https://<your-app-domain>/products/<articleNo>
          if(path.startsWith('/products/')) {
            router.push(path);
          } else {
             toast({
                variant: 'destructive',
                title: 'Invalid QR Code',
                description: 'This QR code does not lead to a valid product page.',
             });
          }
        } catch (e) {
          toast({
            variant: 'destructive',
            title: 'Invalid URL',
            description: 'The scanned QR code contains an invalid URL.',
          });
        }
      }
    }
  };
  
  const handleError = (error: any) => {
    if (error.name !== 'NotFoundException') {
        console.error('QR Scan Error:', error);
        toast({
            variant: 'destructive',
            title: 'Scan Error',
            description: 'Could not scan the QR code. Please try again.',
        });
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
                Point your camera at a QR code to view the fabric details.
              </p>

              <div className="relative aspect-square w-full rounded-md overflow-hidden bg-muted flex items-center justify-center">
                {hasCameraPermission === true ? (
                  <QrScanner
                    onScan={handleScan}
                    onError={handleError}
                    constraints={{ video: { facingMode: 'environment' } }}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <div className="text-center text-muted-foreground p-4">
                      {hasCameraPermission === false ? (
                          <>
                              <CameraOff className="h-16 w-16 mx-auto mb-4" />
                              <h3 className="text-xl font-semibold">Camera Access Required</h3>
                              <p>Please grant camera permissions to scan QR codes.</p>
                          </>
                      ) : (
                          <p className="text-muted-foreground">Requesting camera permission...</p>
                      )}
                  </div>
                )}
              </div>

              {hasCameraPermission === false && (
                  <Alert variant="destructive" className="mt-6">
                      <AlertTitle>Camera Access Denied</AlertTitle>
                      <AlertDescription>
                          To scan QR codes, you need to allow camera access in your browser or system settings.
                      </AlertDescription>
                  </Alert>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
