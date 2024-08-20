import * as React from "react";

import {
	Body,
	Container,
	Column,
	Head,
	Hr,
	Html,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";

interface EmailTemplateProps {
	firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
}) => (
	<Html>
		<Head />
		<Preview>Today's quote</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section>
					<Row>
						<Column></Column>
					</Row>
				</Section>

				<Section style={paragraphContent}>
					<Hr style={hr} />
					<Text style={heading}>🔔 Today's quote</Text>
					<Text style={paragraph}>Hello, {firstName}</Text>
					<Text style={paragraph}>
						We strive to make Google Play a safe and trusted
						experience for users.
					</Text>
					<Text style={paragraph}>
						We've added clarifications to our{" "}
						<Link
							href="https://notifications.google.com"
							style={link}
						>
							Target API Level policy
						</Link>
						. Because this is a clarification, our enforcement
						standards and practices for this policy remain the same.
					</Text>
				</Section>
				<Section style={paragraphList}>
					<Text style={paragraph}>
						We’re noting exceptions to the{" "}
						<Link
							href="https://notifications.google.com"
							style={link}
						>
							Target API Level policy
						</Link>
						, which can be found in our updated{" "}
						<Link
							href="https://notifications.google.com"
							style={link}
						>
							Help Center article.
						</Link>
						These exceptions include permanently private apps and
						apps that target automotive or wearables form factors
						and are bundled within the same package.{" "}
						<Link
							href="https://notifications.google.com"
							style={link}
						>
							Learn more
						</Link>
					</Text>
				</Section>
				<Section style={paragraphContent}>
					<Text style={paragraph}>
						We’re also extending the deadline to give you more time
						to adjust to these changes. Now, apps that target API
						level 29 or below will start experiencing reduced
						distribution starting <b>Jan 31, 2023</b> instead of Nov
						1, 2022. If you need more time to update your app, you
						can request an extension to keep your app discoverable
						to all users until May 1, 2023.
					</Text>
					<Hr style={hr} />
				</Section>

				<Section style={paragraphContent}>
					<Text style={paragraph}>From NYPC,</Text>
					<Text style={{ ...paragraph, fontSize: "20px" }}>⛪️</Text>
				</Section>

				<Section style={{ ...paragraphContent, paddingBottom: 30 }}>
					<Text
						style={{
							...paragraph,
							fontSize: "12px",
							textAlign: "center",
							margin: 0,
						}}
					>
						© 2024 by Rava
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

const main = {
	backgroundColor: "#dbddde",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "30px auto",
	backgroundColor: "#fff",
	borderRadius: 5,
	overflow: "hidden",
};

const heading = {
	fontSize: "14px",
	lineHeight: "26px",
	fontWeight: "700",
	color: "#004dcf",
};

const paragraphContent = {
	padding: "0 40px",
};

const paragraphList = {
	paddingLeft: 40,
};

const paragraph = {
	fontSize: "14px",
	lineHeight: "22px",
	color: "#3c4043",
};

const link = {
	...paragraph,
	color: "#004dcf",
};

const hr = {
	borderColor: "#e8eaed",
	margin: "20px 0",
};
