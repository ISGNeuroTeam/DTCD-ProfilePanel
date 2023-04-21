<template>
  <form class="ProfileTheme">
    <base-heading class="MainTitle" theme="theme_subheaderSmall">
      <h1>Выбор темы</h1>
    </base-heading>
    <h2 class="Subtitle">Выберите цветовую тему</h2>

    <div class="ThemeGroup">
      <base-select
        class="ThemeSelect"
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

    <div class="FooterButtons" @click="saveUserTheme">
      <base-button size="big">Сохранить</base-button>
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
  data() {
    return {
      themeList: [],
      selectedTheme: '',
    };
  },
  computed: {
    styleSystem() {
      return this.$root.styleSystem;
    },
  },
  created() {
    this.styleSystem.getThemes()
      .then((result) => {
        this.themeList = result;
        this.selectedTheme = this.styleSystem.getCurrentTheme().name;
      });
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
    saveUserTheme() {
      this.styleSystem.setTheme(this.selectedTheme);
    },
  },
  watch: {
    selectedTheme: (newValue) => {
      return newValue;
    }
  }
}
</script>

<style lang="scss" scoped>
.ProfileTheme {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .ThemeGroup {
    max-width: 340px;
    padding-right: 30px;
    position: relative;

    @media (max-width: 992px) {
      padding-right: 0;
    }
  }

  .ThemeSelect {
    margin-bottom: 30px;
  }

  .SelectItem {
    padding: 8.5px 0 9.5px 12px;
  }
}
</style>