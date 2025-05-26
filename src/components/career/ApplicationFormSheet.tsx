
"use client";

import { useState, type FormEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2, UploadCloud } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const applicationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  linkedinProfile: z.string().url({ message: "Please enter a valid LinkedIn profile URL." }).min(1, "LinkedIn profile is required."),
  resume: z
    .custom<FileList>(
      (val) => val instanceof FileList,
      "Resume is required."
    )
    .refine((files) => files && files.length > 0, "Resume is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => files?.[0] && ACCEPTED_MIME_TYPES.includes(files[0].type),
      ".pdf, .doc, .docx files are accepted."
    ),
});

type ApplicationFormData = z.infer<typeof applicationFormSchema>;

interface ApplicationFormSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  positionTitle: string | null;
}

export default function ApplicationFormSheet({
  isOpen,
  onOpenChange,
  positionTitle,
}: ApplicationFormSheetProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      linkedinProfile: '',
      resume: undefined,
    },
  });

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate a random error for demonstration
    // const shouldError = Math.random() > 0.8;
    // if (shouldError) {
    //   toast({
    //     variant: "destructive",
    //     title: "Submission Failed",
    //     description: "Something went wrong. Please try again.",
    //   });
    //   setIsSubmitting(false);
    //   return;
    // }

    console.log("Application Data:", data);
    toast({
      title: (
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Application Submitted!
        </div>
      ),
      description: `Thank you for applying for the ${positionTitle} position. We'll be in touch soon.`,
      duration: 5000,
    });
    setIsSubmitting(false);
    form.reset();
    onOpenChange(false); // Close the sheet
  };

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      form.reset(); // Reset form when sheet is closed
    }
    onOpenChange(open);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">Apply for {positionTitle || "Position"}</SheetTitle>
          <SheetDescription>
            Fill out the form below to submit your application. All fields are required.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://linkedin.com/in/johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Upload Resume</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center justify-center w-full">
                        <Label
                            htmlFor="resume-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/75"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-1 text-sm text-muted-foreground">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (MAX. 5MB)</p>
                                {value?.length && (
                                <p className="text-xs text-primary mt-1">{value[0].name}</p>
                                )}
                            </div>
                            <Input 
                                id="resume-upload" 
                                type="file" 
                                className="hidden"
                                onChange={(e) => onChange(e.target.files)}
                                {...rest}
                                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            />
                        </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="mt-8">
              <SheetClose asChild>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
