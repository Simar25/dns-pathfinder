import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Video, ExternalLink } from "lucide-react";

interface LearnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LearnModal = ({ open, onOpenChange }: LearnModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Learn About DNS
          </DialogTitle>
          <DialogDescription>
            Educational materials and project overview
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {/* Materials Section */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">DNS Fundamentals</h3>
              <div className="space-y-2 text-sm">
                <p>
                  The Domain Name System (DNS) is a hierarchical and decentralized naming system
                  for computers, services, or other resources connected to the Internet or a private network.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>A Record:</strong> Maps domain to IPv4 address</li>
                  <li><strong>AAAA Record:</strong> Maps domain to IPv6 address</li>
                  <li><strong>CNAME Record:</strong> Creates an alias for another domain</li>
                  <li><strong>MX Record:</strong> Specifies mail server for the domain</li>
                </ul>
              </div>
            </section>

            {/* How We Built It */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">How We Built This Project</h3>
              <div className="space-y-2 text-sm">
                <p>This DNS Simulator was built using modern web technologies:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>React & TypeScript:</strong> For type-safe component architecture</li>
                  <li><strong>Tailwind CSS:</strong> For responsive styling</li>
                  <li><strong>Shadcn/ui:</strong> For beautiful UI components</li>
                  <li><strong>React Query:</strong> For state management</li>
                </ul>
                <p className="mt-2">
                  The simulator implements a step-by-step resolution process that mimics
                  real DNS behavior, including cache lookups, recursive queries, and
                  authoritative server responses.
                </p>
              </div>
            </section>

            {/* Video Section */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Video className="w-5 h-5" />
                Educational Video
              </h3>
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Add your educational video URL here</p>
                  <p className="text-xs mt-1">Embed from YouTube, Vimeo, or other platforms</p>
                </div>
              </div>
            </section>

            {/* References */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">References</h3>
              <div className="space-y-2">
                <a
                  href="https://www.cloudflare.com/learning/dns/what-is-dns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  Cloudflare - What is DNS?
                </a>
                <a
                  href="https://www.ietf.org/rfc/rfc1035.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  RFC 1035 - Domain Names Specification
                </a>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/DNS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  MDN - DNS Basics
                </a>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LearnModal;
