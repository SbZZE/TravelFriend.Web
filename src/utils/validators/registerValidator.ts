import { ref } from "vue";

interface RegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerUser = ref<RegisterUser>({
  email: "",
  password: "",
  confirmPassword: "",
});

interface RegisterRules {
  email: {
    type: string;
    message: string;
    required: boolean;
    trigger: string;
  }[];
  password: ({
    required: boolean;
    message: string;
    trigger: string;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
  })[];
  confirmPassword: ({
    required: boolean;
    message: string;
    trigger: string;

  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;

  } | {
    validator: (rule: RegisterRules, value: string, callback: any) => void;
    trigger: string;
  })[];
}

const validatePass2 = (rule: RegisterRules, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerUser.value.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

export const registerRules = ref<RegisterRules>({
  email: [
    {
      type: "email",
      message: "邮箱格式错误...",
      required: true,
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空...",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "密码长度必须6-30个字符...",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "确认密码不能为空...",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "密码长度必须6-30个字符...",
      trigger: "blur",
    },
    { validator: validatePass2, trigger: "blur" },
  ]
});
