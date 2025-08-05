import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
export const genaretTocken = (
  jwtPaload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const tocken = jwt.sign(jwtPaload, secret, { expiresIn } as SignOptions);
  return tocken;
};
