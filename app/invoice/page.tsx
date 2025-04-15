"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Upload, AlertCircle, CheckCircle2, FileText } from "lucide-react";

const Inovice_upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    // 获取 token
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);
    
    // 创建 FormData
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 发送文件到后端，带上进度监控
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/files/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      });

      // 上传成功
      setSuccess(true);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      setError(
        err instanceof Error ? err.message :
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "upload failed, please try again"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-220px)] flex flex-col justify-center py-16 mt-12">
    <div className="w-full max-w-md mx-auto text-center space-y-6 ">
      <h1 className="text-3xl font-bold tracking-tight">
      Invoice Analysis
      </h1>
      
      <p className="text-muted-foreground text-lg">
      Upload your purchase invoices to get a personalized consumption analysis report
      </p>
      
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="invoice" className="text-left mb-1">Select Invoice File</Label>
              <div className="flex gap-2">
                <Input
                  id="invoice"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  disabled={uploading}
                  className="flex-1"
                />
                <Button 
                  onClick={handleUpload} 
                  disabled={uploading || !file}
                  className="whitespace-nowrap"
                >
                  {uploading ? (
                    <>uploading</>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload invoices
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {file && !uploading && !success && (
              <div className="flex items-center text-sm text-muted-foreground">
                <FileText className="mr-2 h-4 w-4" />
                Selected: {file.name}
              </div>
            )}
            
            {uploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  uploading {uploadProgress}%
                </p>
              </div>
            )}
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Uploaded failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertTitle>Uploaded successfully</AlertTitle>
                <AlertDescription>
                Your invoice has been successfully uploaded.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="text-sm text-muted-foreground">
      Support for PDF, JPG, JPEG and PNG formats
      </div>
    </div>
    </div>
  );
};

export default Inovice_upload;