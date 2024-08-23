import * as React from "react";

import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import FormatedScripture from "./formated_script";

interface EmailTemplateProps {
	scripturePsg: string;
	scriptureRef: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	scripturePsg,
	scriptureRef,
}) => (
	<Html>
		<Head />
		<Preview>Today&apos;s QT</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={paragraphContent}>
					<Hr style={hr} />
					<Text style={heading}>🔔 Today&apos;s QT</Text>
					<Text style={paragraph}>
						<b>{scriptureRef}</b>
					</Text>
					<FormatedScripture text={scripturePsg} />
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
						&copy; 2024 by Rava
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

const paragraph = {
	fontSize: "14px",
	lineHeight: "22px",
	color: "#3c4043",
};

const hr = {
	borderColor: "#e8eaed",
	margin: "20px 0",
};
