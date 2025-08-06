import jwt, { JwtPayload, SignOptions, verify } from "jsonwebtoken";
export const genaretTocken = (
  jwtPaload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const tocken = jwt.sign(jwtPaload, secret, { expiresIn } as SignOptions);
  return tocken;
};

export const verifyTocken = (tocken: string, secret: string) => {
  const verifyTocken = jwt.verify(tocken, secret) as JwtPayload;
  return verifyTocken;
};
