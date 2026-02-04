<template>
  <AuthLayout>
    <AuthSidebar :icon="TicketIcon" title="Support Ticket Management"
      subtitle="Manage your customer support tickets efficiently with our modern platform">
      <template #features>
        <AuthFeatures :features="loginFeatures" />
      </template>
    </AuthSidebar>

    <AuthFormCard title="Welcome back" subtitle="Please enter your credentials to continue">
      <form @submit.prevent="handleSubmit" class="space-y-7">
        <AuthInput label="Email address" type="email" v-model="formData.email" placeholder="name@company.com"
          :icon="EmailIcon" />

        <AuthInput label="Password" :type="showPassword ? 'text' : 'password'" v-model="formData.password"
          placeholder="Enter your password" :icon="LockIcon">
          <template #right>
            <PasswordToggle :show="showPassword" @toggle="showPassword = !showPassword" />
          </template>
        </AuthInput>

        <AuthButton :loading="loading" loading-text="Signing in...">
          Sign in
        </AuthButton>
      </form>

      <template #footer>
        <p class="text-gray-600">
          Don't have an account?
          <NuxtLink to="/register" class="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Create account
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

const formData = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const showPassword = ref(false);
const { login } = useAuth();

const loginFeatures = [
  {
    text: "Real-time ticket tracking",
    bgColor: "bg-green-100",
    iconColor: "#059669",
  },
  {
    text: "Team collaboration tools",
    bgColor: "bg-blue-100",
    iconColor: "#2563eb",
  },
  {
    text: "Advanced reporting",
    bgColor: "bg-purple-100",
    iconColor: "#9333ea",
  },
];

const handleSubmit = async () => {
  loading.value = true;
  const toast = useToast();

  try {
    await login(formData);
    toast.success("Login successful!");
    navigateTo("/tickets");
  } catch (err) {
    console.error("Login failed:", err);
    toast.error(err.data?.message || "Login failed");
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  middleware: "guest",
  layout: "blank",
});
</script>
