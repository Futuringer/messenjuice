const profileTmp = `
<main class="profile__main">
  <div class="profile__formPart">
    <div class="profile__form-container">

      {{#if profileFormIsActive}}
        {{{profileForm}}}
      {{/if}}

      {{#if passwordsFormIsActive}}
      {{{passwordsForm}}}
      {{/if}}

      {{#if changeInfoFormIsActive}}
      {{{infoChangeForm}}}
      {{/if}}
    </div>
  </div>

  <div class="profile__avatarPart">
    <div class="splitScreen__logo">
      <img class="profile__avatarImage" src={{avatar}}>
      {{{avatarForm}}}
      <p class="profile__avatar">{{data.first_name}}</p>
    </div>
  </div>
</main>
`;

export default profileTmp;
