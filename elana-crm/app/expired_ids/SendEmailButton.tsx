import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

export default function SendEmailButton() {
  return (
    <Flex gap="3" align="center">
      <Button size="2" variant="soft">
        <Link href="/Mailerlite">Send Email</Link>
      </Button>
    </Flex>
  );
}
