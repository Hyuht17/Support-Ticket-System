<template>
  <AuthLayout>
    <AuthSidebar
      :icon="TicketIcon"
      title="Get Started Today"
      subtitle="Create your account and manage support tickets efficiently"
    >
      <template #features>
        <AuthFeatures :features="registerFeatures" />
      </template>
    </AuthSidebar>

    <AuthFormCard
      title="Create account"
      subtitle="Fill in your details to get started"
    >
      <form @submit.prevent="handleSubmit" class="space-y-7">
        <AuthInput
          label="Full Name"
          type="text"
          v-model="formData.name"
          placeholder="John Doe"
          :icon="UserIcon"
        />

        <AuthInput
          label="Email address"
          type="email"
          v-model="formData.email"
          placeholder="name@company.com"
          :icon="EmailIcon"
        />

        <AuthInput
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="formData.password"
          placeholder="Create a password"
          :icon="LockIcon"
        >
          <template #right>
            <PasswordToggle
              :show="showPassword"
              @toggle="showPassword = !showPassword"
            />
          </template>
        </AuthInput>

        <AuthInput
          label="Confirm Password"
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="formData.password_confirmation"
          placeholder="Confirm your password"
          :icon="LockIcon"
        >
          <template #right>
            <PasswordToggle
              :show="showConfirmPassword"
              @toggle="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </AuthInput>

        <AuthButton :loading="loading" loading-text="Creating account...">
          Create account
        </AuthButton>
      </form>

      <template #footer>
        <p class="text-gray-600">
          Already have an account?
          <NuxtLink
            to="/login"
            class="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign in
          </NuxtLink>
        </p>
      </template>
    </AuthFormCard>

    <AuthFooter />
  </AuthLayout>
</template>

<script setup>
import TicketIcon from '~/components/icons/TicketIcon.vue'
import EmailIcon from '~/components/icons/EmailIcon.vue'
import LockIcon from '~/components/icons/LockIcon.vue'
import UserIcon from '~/components/icons/UserIcon.vue'

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const { register } = useAuth();
const toast = useToast();

const registerFeatures = [
  {
    text: "Quick and easy setup",
    bgColor: "bg-blue-100",
    iconColor: "#2563eb",
  },
  {
    text: "Secure password encryption",
    bgColor: "bg-green-100",
    iconColor: "#059669",
  },
  {
    text: "Instant account activation",
    bgColor: "bg-purple-100",
    iconColor: "#9333ea",
  },
];

const handleSubmit = async () => {
  // Validate passwords match
  if (formData.password !== formData.password_confirmation) {
    toast.error("Passwords do not match");
    return;
  }

  loading.value = true;

  try {
    await register(formData);
    toast.success("Account created successfully! Redirecting to login...");
    setTimeout(() => {
      navigateTo("/login");
    }, 2000);
  } catch (err) {
    console.error("Registration failed:", err);
    toast.error(err.data?.message || "Registration failed");
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  middleware: "guest",
  layout: "blank",
});
</script>
