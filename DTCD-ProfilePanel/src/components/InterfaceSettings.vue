<template>
  <form class="ProfileTheme">
    <base-heading class="MainTitle" theme="theme_subheaderSmall">
      <h1>Настройки отображения</h1>
    </base-heading>

    <div class="FieldGroup">
      <h2 class="Subtitle">Выберите цветовую тему</h2>

      <base-select
        class="FieldInput"
        :value="selectedTheme"
        size="big"
        label="Мои темы"
        @input="handleThemeSelector"
      >
        <div
          v-for="(theme, index) in themeList"
          :key="theme+index"
          slot="item"
          class="SelectItem"
          :value="theme.name"
          v-text="theme.name"
        />
      </base-select>
      <ThemeWindow ref="themePreview" />
    </div>

    <div class="FieldGroup">
      <h2 class="Subtitle">Настройки форматирования</h2>

      <base-select
        class="FieldInput"
        :value="selectedNumberFormat"
        size="big"
        label="Формат чисел"
        @input="handleInput($event, 'selectedNumberFormat')"
      >
        <div
          v-for="(numberFormat, index) in numberFormatItems"
          :key="numberFormat.text+index"
          slot="item"
          :value="numberFormat.value"
          v-text="numberFormat.text"
        />
      </base-select>

      <base-select
        class="FieldInput"
        :value="signsAfterComma"
        size="big"
        label="Количество знаков после запятой"
        @input="handleInput($event, 'signsAfterComma')"
      >
        <div
          :key="20"
          slot="item"
          :value="20"
          v-text="'Без ограничений'"
        />
        <div
          v-for="(num, i) in 11"
          :key="i"
          slot="item"
          :value="i"
          v-text="i"
        />
      </base-select>
    </div>

    <div class="FooterButtons">
      <base-button
        size="big"
        @click="saveUserSettings"
      >Сохранить</base-button>
    </div>
  </form>
</template>

<script>
import ThemeWindow from './ThemeWindow.vue';

export default {
  name: 'interface-settings',
  components: {
    ThemeWindow,
  },
  data({$root}) {
    return {
      themeList: [],
      selectedTheme: '',
      selectedNumberFormat: '',
      signsAfterComma: 20,
      notificationSystem: $root.notificationSystem,
    };
  },
  computed: {
    styleSystem() {
      return this.$root.styleSystem;
    },
    numberFormatItems() {
      const numberFormatExample = 1000.01;
      return [
        {
          text: `${numberFormatExample} - Без форматирования`,
          value: 'no',
        },
        {
          text: `${numberFormatExample.toLocaleString()} - Автоматический`,
          value: 'auto',
        },
        ...['en-US', 'ru-RU', 'tr-CY'].map((value) => ({
          text: numberFormatExample.toLocaleString(value),
          value,
        })),
      ];
    },
  },
  created() {
    this.styleSystem.getThemes()
      .then((result) => {
        this.themeList = result;
        this.selectedTheme = this.styleSystem.getCurrentTheme().name;
      });

    this.selectedNumberFormat = window.localStorage.getItem('settings.numberFormat')
                              || this.numberFormatItems[0].value;
    this.signsAfterComma = window.localStorage.getItem('settings.signsAfterComma') ?? this.signsAfterComma;
  },
  methods: {
    handleThemeSelector(event) {
      const { value } = event.target;

      if (value === this.selectedTheme) return;

      const theme = this.themeList.find(t => t.name === value);
      if (value) {
        this.selectedTheme = value;
        this.styleSystem.setVariablesToElement(this.$refs.themePreview.$el, theme);
      }
    },
    saveUserSettings() {
      this.styleSystem.setTheme(this.selectedTheme);
      window.localStorage.setItem('settings.numberFormat', this.selectedNumberFormat);
      window.localStorage.setItem('settings.signsAfterComma', this.signsAfterComma);
      this.notificationSystem.create(
        'Готово!',
        'Настройки сохранены.',
        {
          floatMode: true,
          floatTime: 5,
          type: 'success',
        }
      );
    },
    handleInput(event, fieldName) {
      const { value } = event.target;
      this[fieldName] = value;
    }
  },
}
</script>

<style lang="scss" scoped>
.ProfileTheme {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .MainTitle,
  .Subtitle {
    margin: 0;
    padding-bottom: 16px;
  }

  .FieldGroup {
    padding-bottom: 30px;
  }

  .FieldInput {
    padding-bottom: 16px;
  }
}
</style>