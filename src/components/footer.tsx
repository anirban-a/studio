export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p className="font-bold">Medical Disclaimer</p>
        <p className="mt-2 max-w-3xl mx-auto">
          This application provides AI-generated suggestions and is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </footer>
  );
}
