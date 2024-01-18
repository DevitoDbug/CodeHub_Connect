export const handleError = (err: unknown): string => {
  let message: string;
  message = "";

  if (err instanceof Error) {
    message = err.message;
  } else if (err && typeof err === "object" && "message" in err) {
    message = String(err.message);
  } else if (typeof err == "string") {
    message = err;
  } else {
    message = "something went wrong";
  }
  return message;
};
