import { Button } from "@/components/ui/button"
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <Button>
        <Link href="/project-creation">
          Go to project creation
        </Link>
      </Button>
    </>
  );
}
