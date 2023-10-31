<template>
  <div class="ProfilePanel" :class="{ withOpenedSidebar: isSidebarOpened }">
    <section class="Sidebar">
      <button @click="isSidebarOpened = !isSidebarOpened" class="BtnSidebar type_hide">
        <span class="FontIcon name_chevronBigDown rotate_90 size_md"></span>
      </button>
      <div class="ProfileOwner">
        <div class="ProfilePhoto" ref="photoBox"></div>
        <div class="ProfileOwnerData">
          <base-heading class="ProfileOwnerName" theme="theme_subheaderSmall">
            <h1 v-text="fullname" />
          </base-heading>
          <!-- DISABLED TO THE FUTURE -->
          <!-- <p class="ProfileOwnerPosition">Дизайнер в ISG Neuro</p>
          <p class="ProfileOwnerRole">Роль: Администратор</p> -->
        </div>
      </div>

      <nav class="SidebarMenu">
        <h2 class="SidebarMenuTitle">
          <span class="SidebarIcon FontIcon name_userFilled"></span>
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
          Настройки отображения
        </button>
        <button
          class="SidebarMenuItem"
          :class="{ active: typeVisibleContent === 'profile_settings' }"
          @click="toggleProfileContent('profile_settings')"
        >
          Настройки профиля
        </button>
        <button
          class="SidebarMenuItem"
          :class="{ active: typeVisibleContent === 'security_settings' }"
          @click="toggleProfileContent('security_settings')"
        >
          Настройки безопасности
        </button>
      </nav>
      <!-- DISABLED TO THE FUTURE -->
      <!-- <nav class="SidebarMenu">
        <h2 class="SidebarMenuTitle">
          <span class="SidebarIcon FontIcon name_admin"></span>
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
        <span class="FontIcon name_logout"></span>
        <span class="Text">Выход</span>
      </button>
    </section>

    <section class="MainContent">
      <div class="MainContentWrapper">
        <button @click="isSidebarOpened = !isSidebarOpened" class="BtnSidebar type_open">
          <span class="FontIcon name_chevronBigDown rotate_270 size_md"></span>
        </button>

        <form v-if="typeVisibleContent === 'profile_info'" class="MyProfile">
          <base-heading class="MainTitle" theme="theme_subheaderSmall">
            <h1>Мой профиль</h1>
          </base-heading>

          <h2 class="Subtitle">Основная информация</h2>

          <div class="ProfileTable">
            <div class="TableRow">
              <div class="TableCell">Имя:</div>
              <div class="TableCell type_bold" v-text="fullname" />
            </div>
            <div class="TableRow">
              <div class="TableCell">Имя пользователя:</div>
              <div class="TableCell type_bold" v-text="userData.username" />
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

        <interface-settings v-if="typeVisibleContent === 'choice_theme'" />

        <form v-if="typeVisibleContent === 'profile_settings'" class="ProfileSettings">
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
            <span slot="icon" class="FontIcon name_loadImage size_lg"></span>
          </base-file-loader>

          <span class="Annotation">
            Загрузите изображение в формате JPEG или PNG. Максимальный размер файла не должен
            превышать 10mb.
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
            <base-button size="big" theme="theme_blueSec" @click="revertUserData" disabled>Отменить</base-button>
            <base-button size="big" @click="saveUserData" disabled>Сохранить</base-button>
          </div>
        </form>

        <SecuritySettings v-if="typeVisibleContent === 'security_settings'" />
      </div>
    </section>
  </div>
</template>

<script>
// import ThemeWindow from '@/components/ThemeWindow';
import SecuritySettings from './SecuritySettings.vue';
import InterfaceSettings from './InterfaceSettings.vue';

export default {
  name: 'ProfilePanel',
  components: {
    // ThemeWindow,
    SecuritySettings,
    InterfaceSettings,
    InterfaceSettings,
  },
  data(self) {
    return {
      styleSystem: self.$root.styleSystem,
      interactionSystem: self.$root.interactionSystem,
      keycloak: self.$root.keycloak,
      typeVisibleContent: 'profile_info',
      isSidebarOpened: true,
      windowResizeTimer: null,
      userEndpoint: '/dtcd_utils/v1/user',
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
  },
  methods: {
    toggleProfileContent(typeTargetForm) {
      switch (typeTargetForm) {
        case 'choice_theme':
        case 'profile_settings':
        case 'security_settings':
          this.typeVisibleContent = typeTargetForm;
          break;

        default:
          this.typeVisibleContent = 'profile_info';
          break;
      }
    },

    onResize() {
      if (this.windowResizeTimer !== null) {
        clearTimeout(this.windowResizeTimer);
      }
      this.windowResizeTimer = setTimeout(() => {
        if (window.innerWidth > 992) {
          this.isSidebarOpened = true;
        }
      }, 50);
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
      const userData = await this.keycloak.loadUserProfile();
      return userData;
    },

    async handlePhoto(event) {
      if (event.target.value.length <= 0) return;

      const [file] = event.target.value;
      const photo = await this.convertFileToBase64(file);

      this.tempUserData.photo = photo;
      this.setPhotoBackground(photo);
    },

    async saveUserData() {
      // ! Will be refactored
      return;

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
      await this.keycloak.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.ProfilePanel::v-deep {
  --padding-side: 30px;

  font-family: 'Proxima Nova';
  font-size: 17px;
  line-height: 1.3;
  color: var(--text_main);

  &,
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  .Subtitle {
    color: var(--title);
    font-size: 17px;
    font-weight: 400;
  }


  .FooterButtons {
    padding: 32px 0;
    margin-top: auto;
  }
}

.ProfilePanel {
  position: relative;
  display: flex;
  min-height: 100%;
  background-color: var(--background_secondary);

  .FontIcon {
    color: var(--accent);

    &.name_userFilled::before,
    &.name_admin::before,
    &.name_logout::before {
      font-size: 20px;
    }

    &.name_loadImage::before {
      color: var(--text_secondary);
    }
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
        color: var(--general_white);
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
      align-items: end;
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

    .MainContentWrapper {
      max-width: 456px;
      height: 100%;
    }

    .MyProfile,
    .ProfileSettings {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

    .ThemeSelect {
      margin-bottom: 30px;
    }

    .MyProfile {
      .ProfileTable {
        display: table;
        border-collapse: collapse;
        // font-size: 15px;

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
    .Sidebar {
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
