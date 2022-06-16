<template>
  <div class="ThemeWindow">
    <div class="ThemeWrapper">
      <header class="Header">
        <h1 class="ThemeTitle">Название</h1>
        <button type="button" class="ButtonClose" @click="close">
          <span class="FontIcon name_closeBig size_lg"></span>
        </button>
      </header>

      <section class="FormField">
        <p class="MainText">
          Здесь будет какой-то текст. Здесь будет какой-то текст. Здесь будет какой-то текст.
          <a class="MainTextLink">Здесь будет какой-то текст.</a> Здесь будет какой-то текст.
        </p>
        <base-input label="Название" placeholder="Введите название"/>
        <span class="Note">Какой-то текст</span>
        <div class="Content">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 14H2V2H14V14ZM6.06667 11.488L5.15467 12.0507C5.2968 12.3626 5.52717 12.6261 5.81733 12.8087C6.13256 12.9893 6.49073 13.0815 6.854 13.0753C7.04455 13.074 7.23436 13.0517 7.42 13.0087C7.8084 12.9131 8.13768 12.6566 8.32533 12.3033C8.51233 11.8633 8.58127 11.3821 8.52533 10.9073C8.52533 10.8167 8.52533 10.724 8.52533 10.6307C8.52867 9.946 8.52533 9.24933 8.52533 8.57467C8.52533 8.23067 8.52533 7.886 8.52533 7.54067V7.51267H7.4C7.4 7.99667 7.4 8.47956 7.4 8.96133C7.4 9.446 7.4 9.93 7.4 10.4153C7.4 10.5393 7.4 10.6607 7.4 10.7773C7.43347 11.1101 7.40933 11.4461 7.32867 11.7707C7.23182 11.9576 7.03253 12.0684 6.82267 12.052C6.72866 12.0517 6.63521 12.0376 6.54533 12.01C6.36478 11.9156 6.21922 11.7658 6.13 11.5827L6.108 11.5453C6.08733 11.51 6.07333 11.4853 6.06667 11.4853V11.488ZM10.0327 11.3547L9.11733 11.8793C9.19228 12.0433 9.29565 12.1927 9.42267 12.3207C9.454 12.3553 9.48933 12.3927 9.522 12.434C9.96959 12.8343 10.5545 13.0462 11.1547 13.0253C11.9313 13.1019 12.665 12.6559 12.9547 11.9313V11.926C13.0305 11.6597 13.0426 11.3792 12.99 11.1073L13.0127 11.14C12.914 10.5207 12.4653 10.0907 11.5113 9.70333C11.4373 9.66867 11.3607 9.63667 11.286 9.60333C10.9893 9.47533 10.7093 9.35533 10.612 9.13667C10.5686 9.02418 10.5607 8.90111 10.5893 8.784C10.6584 8.54941 10.8847 8.39729 11.128 8.422C11.2023 8.42201 11.2762 8.43278 11.3473 8.454C11.5667 8.52792 11.7442 8.69184 11.8353 8.90467C12.352 8.56667 12.352 8.56667 12.7127 8.342C12.6302 8.20116 12.532 8.0701 12.42 7.95133C12.0778 7.58448 11.5868 7.39396 11.0867 7.434H11.0067L10.6547 7.47867C10.3241 7.55286 10.025 7.72863 9.79933 7.98133C9.53405 8.31309 9.41458 8.73822 9.46823 9.15961C9.52187 9.58099 9.74405 9.96263 10.084 10.2173C10.376 10.4172 10.6909 10.5812 11.022 10.706C11.4493 10.886 11.818 11.0393 11.8927 11.32C11.9378 11.4825 11.9046 11.6569 11.8027 11.7913C11.6217 11.97 11.3714 12.0602 11.118 12.038C11.0482 12.0378 10.9786 12.0333 10.9093 12.0247C10.5323 11.9402 10.2114 11.6945 10.0313 11.3527L10.0327 11.3547Z" fill="#17569B"/>
          </svg>
          <span class="ContentText">JavaScript</span>
        </div>
      </section>

      <footer class="Footer">
        <base-button type="button" theme="theme_secondary" @click="close">
          Отменить
        </base-button>
        <base-button type="button" @click="save">
          Сохранить
        </base-button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeWindow',
};
</script>

<style lang="scss" scoped>
.ThemeWindow {
  @media (min-width: 992px) {
    position: absolute;
    top: 0;
    left: 100%;
  }

  &,
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  .ThemeWrapper {
    background-color: var(--background_main);
    border: none;
    border-radius: 20px;
    width: 306px;
    display: flex;
    flex-direction: column;
    padding: 32px;

    .Header,
    .Footer {
      display: flex;
    }

    .Header {
      position: relative;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border_secondary);
      margin-bottom: 16px;
    }

    .ThemeTitle {
      font-size: 18px;
      font-weight: 700;
      margin: 0;
      color: var(--title);
    }

    .ButtonClose {
      display: flex;
      border: none;
      cursor: pointer;
      background: transparent;
      padding: 0;

      & > svg {
        path {
          fill: var(--title);
        }
      }
    }

    .FormField {
      margin-bottom: 16px;
      font-size: 13px;
      line-height: 1.2;
      color: var(--text_main);

      .MainText {
        margin-top: 0;
      }

      .MainTextLink {
        color: var(--button_primary);
        text-decoration: underline;
        cursor: pointer;
      }

      .Note {
        display: block;
        padding: 4px 0 16px;
        font-size: 10px;
        line-height: 1.2;
        color: var(--text_secondary);
      }

      .Content {
        display: flex;
        align-items: center;

        & > svg {
          path {
            fill: var(--accent);
          }
        }
      }

      .ContentText {
        padding-left: 8px;
      }
    }

    .Footer {
      margin-top: auto;
      justify-content: space-between;
    }
  }
}
</style>
