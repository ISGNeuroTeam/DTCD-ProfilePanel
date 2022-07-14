<template>
  <div class="ProfileSettings">
    <base-heading class="MainTitle" theme="theme_subheaderSmall">
      <h1>Настройки безопасности</h1>
    </base-heading>
    <h2 class="Subtitle">Изменить пароль</h2>
    <base-input
      ref="oldPassInput"
      :value="fields.oldPass.val"
      :type="isPasswordVisible ? 'text' : 'password'"
      class="FieldInput"
      size="big"
      label="Старый пароль"
      placeholder="Введите старый пароль"
      @input="fields.oldPass.val = $event.target.value"
    ></base-input>
    <base-input
      ref="newPassInput"
      :value="fields.newPass.val"
      :type="isPasswordVisible ? 'text' : 'password'"
      class="FieldInput"
      size="big"
      label="Новый пароль"
      placeholder="Введите новый пароль"
      @input="fields.newPass.val = $event.target.value"
    ></base-input>
    <base-input
      ref="newPassRepeatInput"
      :value="fields.newPassRepeat.val"
      :type="isPasswordVisible ? 'text' : 'password'"
      class="FieldInput"
      size="big"
      label="Повторите пароль"
      placeholder="Повторите новый пароль"
      @input="fields.newPassRepeat.val = $event.target.value"
    ></base-input>
    <div class="switch-wrapper">
      <span>Показать пароли</span>
      <base-switch @input="isPasswordVisible = $event.target.value"></base-switch>
    </div>
    <div class="FooterButtons">
      <base-button size="big" theme="theme_blueSec" @click="cancelChanges">Отменить</base-button>
      <base-button size="big" @click="savePassword">Сохранить</base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecuritySettings',
  data: self => ({
    interactionSystem: self.$root.interactionSystem,
    changeEndpoint: '/dtcd_utils/v1/user/change-password',
    isPasswordVisible: false,
    fields: {
      oldPass: { val: '', isValid: false },
      newPass: { val: '', isValid: false },
      newPassRepeat: { val: '', isValid: false },
    },
  }),
  mounted() {
    const { oldPassInput, newPassInput, newPassRepeatInput } = this.$refs;
    oldPassInput.validation = val => this.validateOldPass(val);
    newPassInput.validation = val => this.validateNewPass(val);
    newPassRepeatInput.validation = val => this.validateNewRepeatPass(val);
  },
  methods: {
    async savePassword() {
      ['oldPassInput', 'newPassInput', 'newPassRepeatInput'].forEach(field =>
        this.$refs[field].validate()
      );

      if (!this.isAllFieldsValid()) return;

      const { val: old_pass } = this.fields.oldPass;
      const { val: new_pass } = this.fields.newPass;

      const params = { old_pass, new_pass };

      try {
        const { data } = await this.interactionSystem.PUTRequest(this.changeEndpoint, params);
        alert(data.message);
      } catch (error) {
        const { isAxiosError, response } = error;

        if (!isAxiosError) throw error;

        console.log(response.status, response.data.message);
        alert(response.data.message);
      }
    },

    validateOldPass(val) {
      const isValid = val.length > 0;
      this.fields.oldPass.isValid = isValid;
      return { isValid, message: 'Значение не может быть пустым' };
    },

    validateNewPass(val) {
      if (val.length <= 0) {
        this.fields.newPass.isValid = false;
        return { isValid: false, message: 'Значение не может быть пустым' };
      }

      if (val === this.fields.oldPass.val) {
        this.fields.newPass.isValid = false;
        return { isValid: false, message: 'Новый пароль совпадает со старым' };
      }

      this.fields.newPass.isValid = true;
      return { isValid: true };
    },

    validateNewRepeatPass(val) {
      if (val.length <= 0) {
        this.fields.newPassRepeat.isValid = false;
        return { isValid: false, message: 'Значение не может быть пустым' };
      }

      if (val !== this.fields.newPass.val) {
        this.fields.newPassRepeat.isValid = false;
        return { isValid: false, message: 'Пароли должны совпадать' };
      }

      this.fields.newPassRepeat.isValid = true;
      return { isValid: true };
    },

    cancelChanges() {
      ['oldPass', 'newPass', 'newPassRepeat'].forEach(f => {
        this.fields[f].val = '';
        this.fields[f].isValid = false;
      });
    },

    isAllFieldsValid() {
      return Object.values(this.fields).every(f => f.isValid === true);
    },
  },
};
</script>

<style lang="scss" scoped>
.ProfileSettings {
  &,
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  &,
  * {
    &::after,
    &::before,
    &:not([slot='label']) {
      margin: 0;
      padding: 0;
    }
  }

  display: flex;
  flex-direction: column;
  min-height: 100%;

  .MainTitle,
  .Subtitle,
  .Annotation {
    padding-bottom: 16px;
  }

  .MainTitle {
    display: block;
  }

  .Subtitle {
    color: var(--title);
    font-size: 17px;
    font-weight: 400;
  }

  .FieldInput {
    padding-bottom: 16px;
  }

  .FooterButtons {
    padding: 32px 0;
    margin-top: auto;
  }

  .switch-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
