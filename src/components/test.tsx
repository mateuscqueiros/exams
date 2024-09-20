"use client";
export function Test({ data, error }: any) {
  if (error) {
    console.log(error);
  } else {
    console.log(data[0]);
  }
  return <>Olá mundo</>;
}
