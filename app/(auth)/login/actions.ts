"use server";

// srver action
// server에서 동작하기 때문에 use server을 적어야함

export async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);

  // useState 나 onchange 없이 사용자가 입력한 값을 가져올 수 있음
  console.log(formData.get("email"), formData.get("password"));

  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    // 반환값을 지정할 수 있다.
    errors: ["wrong password", "password too short"],
  };
}
