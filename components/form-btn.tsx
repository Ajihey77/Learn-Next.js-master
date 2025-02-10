"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  // useFormStatus는 사용하려는 컴포넌트의 form 안에 선언해야한다.
  // useFormStatus를 사용하여 form의 마지막 상태를 알 수 있다.
  // 이 훅을 사용하기 위해선 client 환경에서 해야함 = 클라이언트에서 동적으로 바뀌니까
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
