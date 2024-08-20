import { EmailTemplate } from "@/components/email/email_template";

export default function EmailSample({
	params,
}: {
	params: { slug: string[] };
}) {
	return (
		<EmailTemplate
			scriptureRef={decodeURIComponent(params.slug[0])}
			scripturePsg={decodeURIComponent(params.slug[1])}
		/>
	);
}
