<template>
  <div class="ProfilePanel" :class="{ withOpenedSidebar: isSidebarOpened }">
    <section class="Sidebar">
      <button
        @click="isSidebarOpened = !isSidebarOpened"
        class="BtnSidebar type_hide"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9458 2.92929L5.875 10.0001L12.9458 17.071L14.125 15.8926L8.23167 10.0001L14.125 4.10762L12.9458 2.92929Z" fill="#17569B"/>
        </svg>
      </button>
      <div class="ProfileOwner">
        <div class="ProfilePhoto" ref="photoBox"></div>
        <div class="ProfileOwnerData">
          <base-heading class="ProfileOwnerName" theme="theme_subheaderSmall">
            <h1 v-text="fullname"/>
          </base-heading>
          <!-- DISABLED TO THE FUTURE -->
          <!-- <p class="ProfileOwnerPosition">Дизайнер в ISG Neuro</p>
          <p class="ProfileOwnerRole">Роль: Администратор</p> -->
        </div>
      </div>

      <nav class="SidebarMenu">
        <h2 class="SidebarMenuTitle">
          <svg class="SidebarIcon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.83325 6.66667C5.83325 4.36548 7.69873 2.5 9.99992 2.5C12.3011 2.5 14.1666 4.36548 14.1666 6.66667C14.1666 8.96785 12.3011 10.8333 9.99992 10.8333C7.69873 10.8333 5.83325 8.96785 5.83325 6.66667ZM9.99992 9.16667C11.3806 9.16667 12.4999 8.04738 12.4999 6.66667C12.4999 5.28595 11.3806 4.16667 9.99992 4.16667C8.61921 4.16667 7.49992 5.28595 7.49992 6.66667C7.49992 8.04738 8.61921 9.16667 9.99992 9.16667Z" fill="#17569B"/>
            <path d="M5.28587 13.6193C4.03563 14.8695 3.33325 16.5652 3.33325 18.3333H4.99992C4.99992 17.0073 5.5267 15.7355 6.46438 14.7978C7.40207 13.8601 8.67384 13.3333 9.99992 13.3333C11.326 13.3333 12.5978 13.8601 13.5355 14.7978C14.4731 15.7355 14.9999 17.0073 14.9999 18.3333H16.6666C16.6666 16.5652 15.9642 14.8695 14.714 13.6193C13.4637 12.369 11.768 11.6667 9.99992 11.6667C8.23181 11.6667 6.53612 12.369 5.28587 13.6193Z" fill="#17569B"/>
            <path d="M6.46438 14.7978C5.5267 15.7355 4.99992 17.0073 4.99992 18.3333H14.9999C14.9999 17.0073 14.4731 15.7355 13.5355 14.7978C12.5978 13.8601 11.326 13.3333 9.99992 13.3333C8.67384 13.3333 7.40207 13.8601 6.46438 14.7978Z" fill="#17569B"/>
            <path d="M7.49992 6.66667C7.49992 8.04738 8.61921 9.16667 9.99992 9.16667C11.3806 9.16667 12.4999 8.04738 12.4999 6.66667C12.4999 5.28595 11.3806 4.16667 9.99992 4.16667C8.61921 4.16667 7.49992 5.28595 7.49992 6.66667Z" fill="#17569B"/>
          </svg>
          Профиль
        </h2>
        <button
          class="SidebarMenuItem"
          :class="{ active: typeVisibleContent === 'profile_info' }"
          @click="toggleProfileContent('profile_info')"
        >
          Мой профиль
        </button>
        <button
          class="SidebarMenuItem"
          :class="{ active: typeVisibleContent === 'choice_theme' }"
          @click="toggleProfileContent('choice_theme')"
        >
          Выбор темы
        </button>
        <button
          class="SidebarMenuItem"
          :class="{ active: typeVisibleContent === 'profile_settings' }"
          @click="toggleProfileContent('profile_settings')"
        >
          Настройки профиля
        </button>
      </nav>
      <!-- DISABLED TO THE FUTURE -->
      <!-- <nav class="SidebarMenu">
        <h2 class="SidebarMenuTitle">
          <svg class="SidebarIcon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.83325 6.66667C5.83325 4.36548 7.69873 2.5 9.99992 2.5C12.3011 2.5 14.1666 4.36548 14.1666 6.66667C14.1666 8.96785 12.3011 10.8333 9.99992 10.8333C7.69873 10.8333 5.83325 8.96785 5.83325 6.66667ZM9.99992 9.16667C11.3806 9.16667 12.4999 8.04738 12.4999 6.66667C12.4999 5.28595 11.3806 4.16667 9.99992 4.16667C8.61921 4.16667 7.49992 5.28595 7.49992 6.66667C7.49992 8.04738 8.61921 9.16667 9.99992 9.16667Z" fill="#17569B"/>
            <path d="M5.28587 13.6193C4.03563 14.8695 3.33325 16.5652 3.33325 18.3333H4.99992C4.99992 17.0073 5.5267 15.7355 6.46438 14.7978C7.40207 13.8601 8.67384 13.3333 9.99992 13.3333C11.326 13.3333 12.5978 13.8601 13.5355 14.7978C14.4731 15.7355 14.9999 17.0073 14.9999 18.3333H16.6666C16.6666 16.5652 15.9642 14.8695 14.714 13.6193C13.4637 12.369 11.768 11.6667 9.99992 11.6667C8.23181 11.6667 6.53612 12.369 5.28587 13.6193Z" fill="#17569B"/>
            <path d="M6.46438 14.7978C5.5267 15.7355 4.99992 17.0073 4.99992 18.3333H14.9999C14.9999 17.0073 14.4731 15.7355 13.5355 14.7978C12.5978 13.8601 11.326 13.3333 9.99992 13.3333C8.67384 13.3333 7.40207 13.8601 6.46438 14.7978Z" fill="#17569B"/>
            <path d="M7.49992 6.66667C7.49992 8.04738 8.61921 9.16667 9.99992 9.16667C11.3806 9.16667 12.4999 8.04738 12.4999 6.66667C12.4999 5.28595 11.3806 4.16667 9.99992 4.16667C8.61921 4.16667 7.49992 5.28595 7.49992 6.66667Z" fill="#17569B"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4799 7.5H14.792C14.9533 7.49987 15.0928 7.39088 15.1273 7.238L15.2692 6.61167C15.3645 6.57104 15.4574 6.5253 15.5474 6.47467C15.6332 6.42629 15.7163 6.37343 15.7962 6.31633L16.4276 6.51133C16.5815 6.55878 16.7486 6.49595 16.8293 6.36033L17.4545 5.30933C17.5344 5.17351 17.5069 5.00216 17.3882 4.89633L16.8987 4.463C16.9209 4.2667 16.9209 4.06863 16.8987 3.87233L17.3882 3.439C17.5069 3.33317 17.5344 3.16183 17.4545 3.026L16.8293 1.975C16.7486 1.83939 16.5815 1.77656 16.4276 1.824L15.7962 2.019C15.7173 1.96245 15.6351 1.91026 15.5502 1.86267C15.4592 1.81103 15.3653 1.76451 15.2688 1.72333L15.1273 1.09567C15.0929 0.942656 14.9534 0.833498 14.792 0.833333H13.5414C13.38 0.833498 13.2405 0.942656 13.2061 1.09567L13.0659 1.723C12.9745 1.76128 12.8853 1.80423 12.7986 1.85167C12.7083 1.90241 12.621 1.95805 12.5372 2.01833L11.9061 1.82333C11.7522 1.77571 11.5848 1.83857 11.5041 1.97433L11.3093 2.30173C11.9849 2.50407 12.5945 2.85896 13.0982 3.3264C13.3502 3.02556 13.7346 2.83333 14.1653 2.83333C14.9243 2.83333 15.5395 3.43029 15.5395 4.16667C15.5395 4.82541 15.0472 5.37258 14.4 5.48063C14.5017 5.85879 14.5559 6.25638 14.5559 6.66664C14.5559 6.95128 14.5298 7.22982 14.4799 7.5Z" fill="#17569B"/>
          </svg>
          Панель администратора
        </h2>
        <button
          v-on:click="changeClass"
          class="SidebarMenuItem"
        >Пользовательские роли</button>
        <button
          v-on:click="changeClass"
          class="SidebarMenuItem"
        >Пользователи</button>
        <button
          v-on:click="changeClass"
          class="SidebarMenuItem"
        >Настройки</button>
      </nav> -->
      <button class="ButtonBack" @click="logout">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16667 2.5L11.6667 2.5C12.5871 2.5 13.3333 3.24619 13.3333 4.16667L13.3333 7.5L11.6667 7.5L11.6667 4.16667L4.16667 4.16666L4.16667 15.8333L11.6667 15.8333L11.6667 12.5L13.3333 12.5L13.3333 15.8333C13.3333 16.7538 12.5871 17.5 11.6667 17.5L4.16667 17.5C3.24619 17.5 2.5 16.7538 2.5 15.8333L2.5 4.16666C2.5 3.24619 3.24619 2.5 4.16667 2.5ZM10 6.66667L10 9.16667L17.5 9.16667L17.5 10.8333L10 10.8333L10 13.3333L5.83333 10L10 6.66667Z" fill="#17569B"/>
        </svg>
        <span class="Text">Выход</span>
      </button>
    </section>

    <section class="MainContent">
      <div class="MainContentWrapper">
        <button
          @click="isSidebarOpened = !isSidebarOpened"
          class="BtnSidebar type_open"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.05417 17.0707L14.125 9.99988L7.05417 2.92904L5.875 4.10738L11.7683 9.99988L5.875 15.8924L7.05417 17.0707Z" fill="#17569B"/>
          </svg>
        </button>

        <form
          v-if="typeVisibleContent === 'profile_info'"
          class="MyProfile"
        >
          <base-heading class="MainTitle" theme="theme_subheaderSmall">
            <h1>Мой профиль</h1>
          </base-heading>

          <h2 class="Subtitle">Основная информация</h2>

          <div class="ProfileTable">
            <div class="TableRow">
              <div class="TableCell">Имя:</div>
              <div class="TableCell type_bold" v-text="fullname"/>
            </div>
            <div class="TableRow">
              <div class="TableCell">Имя пользователя:</div>
              <div class="TableCell type_bold" v-text="userData.username"/>
            </div>
            <!-- DISABLED TO THE FUTURE -->
            <!-- <div class="TableRow">
              <div class="TableCell">Организация:</div>
              <div class="TableCell type_bold">ISG Neuro</div>
            </div>
            <div class="TableRow">
              <div class="TableCell">Роль:</div>
              <div class="TableCell type_bold">Администратор</div>
            </div> -->
          </div>
        </form>

        <form
          v-if="typeVisibleContent === 'choice_theme'"
          class="ProfileTheme"
        >
          <base-heading class="MainTitle" theme="theme_subheaderSmall">
            <h1>Выбор темы</h1>
          </base-heading>
          <h2 class="Subtitle">Выберите цветовую тему или создайте свою</h2>

          <div class="ThemeGroup">
            <base-select
              class="ThemeSelect"
              :value="selectedTheme"
              size="big"
              label="Мои темы"
              @input="handleThemeSelector($event)"
            >
              <div
                v-for="(theme, index) in themeList"
                :key="index"
                slot="item"
                class="SelectItem"
                :value="theme.name"
                v-text="theme.name"
              />
            </base-select>
            <ThemeWindow />
          </div>

          <div class="FooterButtons" @click="saveUserTheme">
            <base-button size="big">Сохранить</base-button>
          </div>
        </form>

        <form
          v-if="typeVisibleContent === 'profile_settings'"
          class="ProfileSettings"
        >
          <base-heading class="MainTitle" theme="theme_subheaderSmall">
            <h1>Настройки профиля</h1>
          </base-heading>
          <h2 class="Subtitle">Основная информация</h2>

          <base-file-loader
            class="LoadImage"
            label="Фото"
            description="Загрузить изображение"
            accept=".jpg, .jpeg, .png"
            @input="handlePhoto($event)"
          >
            <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM5 5V19H19V5H5ZM18 17H6L9 13L10 14L13 10L18 17ZM8.5 11C7.67157 11 7 10.3284 7 9.5C7 8.67157 7.67157 8 8.5 8C9.32843 8 10 8.67157 10 9.5C10 10.3284 9.32843 11 8.5 11Z" fill="#938FA0"/>
            </svg>
          </base-file-loader>

          <span class="Annotation">
            Загрузите изображение в формате JPEG или PNG.
            Максимальный размер файла не должен превышать 10mb.
          </span>

          <base-input
            :value="tempUserData.firstName"
            class="FieldInput"
            label="Имя"
            placeholder="Введите имя"
            size="big"
            @input="tempUserData.firstName = $event.target.value"
          ></base-input>
          <base-input
            :value="tempUserData.lastName"
            class="FieldInput"
            label="Фамилия"
            placeholder="Введите фамилию"
            size="big"
            @input="tempUserData.lastName = $event.target.value"
          ></base-input>
          <base-input
            :value="tempUserData.email"
            class="FieldInput"
            label="Электронная почта"
            placeholder="Введите адрес электронной почты"
            size="big"
            @input="tempUserData.email = $event.target.value"
          ></base-input>

          <!-- DISABLED TO THE FUTURE -->
          <!-- <h2 class="Subtitle">Изменить пароль</h2>
          <base-input
            class="FieldInput"
            type="password"
            label="Старый пароль"
            size="big">
          </base-input>
          <base-input
            class="FieldInput"
            type="password"
            label="Новый пароль"
            size="big">
          </base-input>
          <base-input
            class="FieldInput"
            type="password"
            label="Повторите пароль"
            size="big">
          </base-input> -->

          <div class="FooterButtons">
            <base-button size="big" theme="theme_blueSec" @click="revertUserData">Отменить</base-button>
            <base-button size="big" @click="saveUserData">Сохранить</base-button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import ThemeWindow from '@/components/ThemeWindow';

export default {
  name: 'ProfilePanel',
  components: { ThemeWindow },
  data(self) {
    return {
      styleSystem: self.$root.styleSystem,
      interactionSystem: self.$root.interactionSystem,
      typeVisibleContent: 'profile_info',
      isSidebarOpened: true,
      windowResizeTimer: null,
      userEndpoint: '/mock_server/v1/user',
      themeList: [],
      selectedTheme: '',
      tempUserData: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        photo: '',
      },
      userData: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        photo: '',
      },
    };
  },
  computed: {
    fullname() {
      const { firstName, lastName } = this.userData;
      return `${firstName} ${lastName}`;
    },
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  async mounted() {
    const userData = await this.getUserData();
    this.setUserData(userData);
    this.themeList = await this.styleSystem.getThemes();
    this.selectedTheme = this.styleSystem.getCurrentTheme().name;
  },
  methods: {
    toggleProfileContent(typeTargetForm) {
      switch (typeTargetForm) {
        case 'choice_theme':
        case 'profile_settings':
          this.typeVisibleContent = typeTargetForm;
          break;

        default:
          this.typeVisibleContent = 'profile_info';
          break;
      }
    },

    onResize() {
      if(this.windowResizeTimer !== null) {
        clearTimeout(this.windowResizeTimer);
      }
      this.windowResizeTimer = setTimeout(() => {
        if (window.innerWidth > 992) {
          this.isSidebarOpened = true;
        }
      }, 50);
    },

    handleThemeSelector(event) {
      const { value } = event.target;
      this.selectedTheme = value;
      // const theme = this.themeList.find(t => t.name === value);
      // this.styleSystem.setVariablesToElement(document.getElementById('page'), theme);
    },

    setPhotoBackground(photoBase64) {
      this.$refs.photoBox.style.backgroundImage = `url(${photoBase64})`;
    },

    revertUserData() {
      this.tempUserData = { ...this.userData };
    },

    setUserData(data) {
      for (const [key, value] of Object.entries(data)) {
        if (key in this.userData) {
          this.userData[key] = value;
          this.tempUserData[key] = value;
          if (key === 'photo') this.setPhotoBackground(value);
        }
      }
    },

    convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

    async getUserData() {
      const result = await this.interactionSystem.GETRequest(this.userEndpoint);
      return result.data;
    },

    async handlePhoto(event) {
      if (event.target.value.length <= 0) return;

      const [file] = event.target.value;
      const photo = await this.convertFileToBase64(file);

      this.tempUserData.photo = photo;
      this.setPhotoBackground(photo);
    },

    async saveUserData() {
      const params = {};

      for (const [key, value] of Object.entries(this.tempUserData)) {
        if (key !== 'username' && value !== this.userData[key]) {
          params[key] = value;
        }
      }

      if (Object.keys(params).length <= 0) return;

      try {
        const result = await this.interactionSystem.PUTRequest(this.userEndpoint, params);
        this.setUserData(result.data);
      } catch (error) {
        const { isAxiosError, response } = error;
        if (isAxiosError && response.status === 304) {
          return;
        }
        throw error;
      }
    },

    saveUserTheme() {
      this.styleSystem.setTheme(this.selectedTheme);
    },

    async logout() {
      await Application.getSystem('AuthSystem', '0.1.0').logout();
    },
  },
};
</script>

<style lang="scss" scoped>

.ProfilePanel {
  --padding-side: 30px;

  font-family: 'Proxima Nova';
  font-size: 17px;
  line-height: 1.3;
  color: var(--text_main);
  position: relative;
  display: flex;
  min-height: 100%;
  background-color: var(--background_secondary);

  svg {
    path {
      fill: var(--accent);
    }
  }

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
    &:not([slot="label"]) {
      margin: 0;
      padding: 0;
    }
  }

  .Sidebar {
    max-width: 320px;
    min-height: 100%;
    background-color: var(--border_secondary);
    display: none;
    position: relative;
    transition: 0.3s;
    z-index: 1;
    flex-direction: column;

    @media (max-width: 992px) {
      max-width: 300px;
    }

    .ProfileOwner {
      padding: 50px var(--padding-side) 30px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .ProfilePhoto {
        max-width: 258px;
        width: 100%;
        border-radius: 20px;
        background-color: var(--button_primary_24);
        margin-bottom: 8px;
        position: relative;
        display: flex;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        &::before {
          content: '';
          display: block;
          padding-top: 100%;
          float: left;
        }
        &::after {
          content: '';
          display: block;
          clear: both;
        }
      }

      .ProfileOwnerName {
        display: block;
        padding-bottom: 4px;
      }

      .ProfileOwnerRole {
        display: block;
        font-size: 15px;
        line-height: 1.7;
        color: var(--text_secondary);
      }
    }

    .SidebarIcon {
      margin-right: 3px;
    }

    .SidebarMenu {
      padding-bottom: 10px;
    }

    .SidebarMenuItem {
      color: var(--button_primary);
      display: block;
      padding: 6px var(--padding-side) 6px calc(var(--padding-side) + 23px);
      font-size: 15px;
      font-weight: 600;
      width: 100%;
      text-decoration: none;
      margin-bottom: 4px;
      border: none;
      background-color: transparent;
      display: flex;
      text-align: start;
      cursor: pointer;
      transition: 0.3s ease all;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background-color: var(--button_primary_24);
      }

      &.active {
        background-color: var(--button_primary_86);
        color:var(--background_main);
      }
    }

    .ButtonBack {
      border: none;
      background-color: transparent;
      display: flex;
      padding: 20px var(--padding-side) 50px;
      cursor: pointer;
      font-weight: 700;
      font-size: 17px;
      align-items: center;
      margin-top: auto;

      .Text {
        padding-left: 8px;
      }
    }
  }

  .MainContent {
    padding: 50px 20px 0;
    width: 100vw;
    background-color: var(--background_secondary);

    @media (max-width: 768px) {
      position: absolute;
      left: 0;
      top: 0;
    }

    .MainContentWrapper{
      max-width: 456px;
      height: 100%;
    }

    .MyProfile,
    .ProfileTheme,
    .ProfileSettings {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

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

    .MyProfile {
      .ProfileTable {
        display: table;
        border-collapse:collapse;
        font-size: 15px;

        .TableRow {
          display: table-row;

          .TableCell {
            display: table-cell;
            padding-bottom: 8px;
            min-width: 133px;

            &.type_bold {
              padding-left: 30px;
              font-weight: 700;
            }
          }
        }
      }
    }

    .SelectItem {
      padding: 8.5px 0 9.5px 12px;
    }

    .Annotation {
      color: var(--text_secondary);
      display: block;
      font-size: 11px;
      line-height: 1.1;
    }

    .MainTitle,
    .Subtitle,
    .Annotation {
      padding-bottom: 16px;
    }

    .MainTitle {
      display: block;
    }

    .FieldInput {
      padding-bottom: 16px;
    }

    .FooterButtons {
      padding: 32px 0;
      margin-top: auto;
    }
  }

  .BtnSidebar {
    position: absolute;
    top: 20px;
    cursor: pointer;
    border: none;
    background-color: transparent;

    &.type_hide {
      right: 20px;

      @media (min-width: 992px) {
        display: none;
      }
    }

    &.type_open {
      display: flex;
      left: 20px;
    }
  }

  .Subtitle {
    color: var(--title);
    font-size: 17px;
  }

  .ProfileOwnerPosition {
    padding-bottom: 4px;
  }

  .SidebarMenuTitle {
    padding: 0 var(--padding-side) 16px;
    font-weight: 700;
    font-size: 17px;
    display: flex;
  }

  .ProfileOwnerPosition,
  .SidebarMenuTitle,
  .ButtonBack {
    color: var(--text_main);
  }

  .LoadImage {
    height: 116px;
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;

    svg {
      path {
        fill: var(--text_secondary);
      }
    }
  }

  &.withOpenedSidebar {
    .Sidebar{
      display: flex;
      width: 100%;

      @media (max-width: 576px) {
        max-width: 100vw;
        position: absolute;
      }
    }

    .BtnHideSidebar {
      display: flex;

      @media (min-width: 992px) {
        display: none;
      }
    }

    .BtnOpenSidebar {
      display: none;
    }
  }
}
</style>
