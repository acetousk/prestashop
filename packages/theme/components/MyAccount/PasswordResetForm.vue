<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form
      class="form"
      @submit.prevent="handleSubmit(submitForm(reset))"
    >
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        class="form__element"
      >
        <SfInput
          v-model="form.currentPassword"
          type="password"
          name="currentPassword"
          label="Current Password"
          required
          :valid="!errors[0]"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <div class="form__horizontal">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|password"
          vid="password"
          class="form__element"
        >
          <SfInput
            v-model="form.newPassword"
            type="password"
            name="newPassword"
            label="New Password"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|confirmed:password"
          class="form__element"
        >
          <SfInput
            v-model="form.repeatPassword"
            type="password"
            name="repeatPassword"
            label="Repeat Password"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div>
      <SfButton class="form__button">
        {{ $t('Update password') }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import {computed, defineComponent} from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { SfInput, SfButton } from '@storefront-ui/vue';
import { useUser, userGetters } from '@vue-storefront/moqui';
import { useUiNotification } from '~/composables';
export default defineComponent({
  name: 'PasswordResetForm',
  components: {
    SfInput,
    SfButton,
    ValidationProvider,
    ValidationObserver
  },
  setup(_, { emit }) {
    const { user } = useUser();
    const {send: sendNotification} = useUiNotification();

    const form = computed(() => ({
      currentUser: {
        firstName: user.value ? userGetters.getFirstName(user.value) : '',
        lastName: user.value ? userGetters.getLastName(user.value) : '',
        email: user.value ? userGetters.getEmailAddress(user.value) : '',
        gender: user.value ? userGetters.getGender(user.value) : ''
      },
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    }));

    const submitForm = (resetValidationFn) => () => {
      const onComplete = (data) => {
        // form.value = resetForm();
        sendNotification({
          id: Symbol('password_updated'),
          message: data.message ? data.message : 'The user password was changed successfully updated!',
          type: 'success',
          icon: 'check',
          persist: false,
          title: 'User Account'
        });
        resetValidationFn();
      };
      const onError = (error) => {
        sendNotification({
          id: Symbol('password_not_updated'),
          message: error.message ? error.message : 'It was not possible to update your password.',
          type: 'danger',
          icon: 'cross',
          persist: false,
          title: 'User Account'
        });
      };
      emit('submit', { form, onComplete, onError });
    };
    return {
      form,
      submitForm
    };
  }
});
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin: 0 0 var(--spacer-lg) 0;
  }
  &__button {
    display: block;
    width: 100%;
    @include for-desktop {
      width: 17.5rem;
    }
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
