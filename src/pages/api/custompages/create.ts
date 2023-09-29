import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const cookies = req.headers.cookie ?? "";
  if (!cookies.includes(`token=${process.env.ADMIN_PASSWORD}`)) {
    res.end("Unauthorized");
    return;
  }

  const { id, label, url, type, bgType, bgColour, textColour, textBgColour, textBgOpacity } = JSON.parse(req.body) as {id: string, label: string, url: string, type: string, bgType: string, bgColour: string, textColour: string, textBgColour: string, textBgOpacity: string};
  if (id === undefined || label === undefined || url === undefined || type === undefined || bgType === undefined || bgColour === undefined || textColour === undefined || textBgColour === undefined || textBgOpacity === undefined){
    res.end("Invalid request");
    return;
  }

  let bgValue = "";
  if (bgType == "colour" || bgType == "imageStretch") {
    bgValue = textBgColour;
  } else {
    console.log("Invalid bgType");
    res.end("Invalid request");
    return;
  }

  const textBgColourFull = `#${Number(
    textBgOpacity
  ).toString(16)}${textBgColour.substring(1)}`;

  const dataCheck = await (
    await fetch(
      `${process.env.FIREBASE_URL}/redirects/${id}.json`
    )
  ).json();
  if (dataCheck != null) {
    console.log("Already exists");
    res.end("Already exists");
    return;
  }

  await fetch(
    `${process.env.FIREBASE_URL}/redirects/${id}.json`,
    {
      method: "PUT",
      body: JSON.stringify({
        url: url,
        label: label,
        views: 0,
        type: type,
        themeType: bgType,
        themeBgValue: bgValue,
        themeTextColor: textColour,
        themeTextBgColor: textBgColourFull,
      }),
    }
  );

  res.end("Success");
}