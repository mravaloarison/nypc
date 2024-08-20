import React from "react";
import { Text } from "@react-email/components";

interface Props {
	text: string;
}

const FormatedParagraph = ({ paragraph }: { paragraph: string }) => {
	const formatText = (text: string): React.ReactNode => {
		const regex = /\[(\d+)\]/g;

		const parts = text.split(regex);

		return parts.map((part, index) => {
			if (index % 2 === 1) {
				return (
					<span key={index}>
						<small>[{part}]</small>
					</span>
				);
			}
			return part;
		});
	};

	return <p style={p}>{formatText(paragraph)}</p>;
};

const FormatedScripture: React.FC<Props> = ({ text }) => {
	const paragraphs = text.split("\n\n");

	return (
		<>
			{paragraphs.map((paragraph, index) => (
				<Text>
					<FormatedParagraph key={index} paragraph={paragraph} />
				</Text>
			))}
		</>
	);
};

export default FormatedScripture;

const p = {
	fontSize: 16,
	color: "#3c4043",
};
