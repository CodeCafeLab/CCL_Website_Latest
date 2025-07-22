
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  UploadCloud,
  FileText,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = ["text/csv"];

const importSchema = z.object({
  importType: z.string().min(1, { message: "Please select a data type to import." }),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "CSV file is required.")
    .refine((files) => files?.length > 0, "CSV file is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => files?.[0] && ACCEPTED_MIME_TYPES.includes(files[0].type),
      "Only .csv files are accepted."
    ),
});

type ImportFormData = z.infer<typeof importSchema>;

type ImportResult = {
  success: boolean;
  message: string;
  successCount?: number;
  errorCount?: number;
  errors?: { row: number; error: string }[];
};

export default function BulkImportPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<ImportFormData>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      importType: "",
      file: undefined,
    },
  });

  const onSubmit: SubmitHandler<ImportFormData> = async (data) => {
    setIsSubmitting(true);
    setImportResult(null);

    const formData = new FormData();
    formData.append("importType", data.importType);
    formData.append("file", data.file[0]);

    try {
      const response = await fetch("/api/import", {
        method: "POST",
        body: formData,
      });

      const result: ImportResult = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "An unknown error occurred during import.");
      }

      setImportResult(result);
      toast({
        title: "Import Processed",
        description: `${result.successCount || 0} records imported successfully.`,
      });
      form.reset();
      setFileName(null);
    } catch (error: any) {
      console.error("Import error:", error);
      const errorMessage = error.message || "Something went wrong. Please try again.";
      setImportResult({ success: false, message: errorMessage });
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <UploadCloud className="h-8 w-8 text-primary" />
            Bulk Data Import
          </CardTitle>
          <CardDescription>
            Import data into your application by uploading a CSV file.
            Select the data type and upload the corresponding file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="importType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Type to Import</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a data type..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="blogs">Blog Posts</SelectItem>
                        <SelectItem value="products">Products</SelectItem>
                        <SelectItem value="users">Users</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload CSV File</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          id="file-upload"
                          accept=".csv"
                          disabled={isSubmitting}
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            setFileName(e.target.files?.[0]?.name || null);
                          }}
                          className="hidden"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex items-center justify-center w-full h-32 px-4 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors"
                        >
                          {fileName ? (
                            <div className="text-center text-primary">
                              <FileText className="mx-auto h-8 w-8 mb-2" />
                              <p className="font-semibold">{fileName}</p>
                            </div>
                          ) : (
                            <div className="text-center text-muted-foreground">
                              <UploadCloud className="mx-auto h-8 w-8 mb-2" />
                              <p>
                                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs">CSV only, up to 5MB</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Import...
                  </>
                ) : (
                  "Start Import"
                )}
              </Button>
            </form>
          </Form>

          {importResult && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Import Results</h3>
              {importResult.success ? (
                <div className="p-4 rounded-md bg-green-50 border border-green-200 text-green-800">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 text-green-600" />
                    <div>
                      <p className="font-semibold">{importResult.message}</p>
                      <p>Successfully imported: {importResult.successCount}</p>
                      <p>Failed rows: {importResult.errorCount}</p>
                    </div>
                  </div>
                </div>
              ) : (
                 <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-800">
                   <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 mt-0.5 text-red-600" />
                    <div>
                      <p className="font-semibold">Import Failed</p>
                      <p>{importResult.message}</p>
                    </div>
                  </div>
                </div>
              )}
              {importResult.errors && importResult.errors.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold">Error Details:</h4>
                  <ul className="text-xs list-disc list-inside mt-2 space-y-1 max-h-40 overflow-y-auto">
                    {importResult.errors.map((err, index) => (
                      <li key={index}>
                        Row {err.row}: {err.error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
