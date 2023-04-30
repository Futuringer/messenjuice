const chatTmp = `
<main class="chat__main">
  <div class="chat__contactsPart">
  <div class="chat__settingsButton">{{{settingsButton}}}</div>
      {{{searchInput}}}
      {{{contacts}}}
  </div>

  <div class="chat__contentPart contentPart">
    <div class="contentPart__top">
      {{{chatUsers}}}
    </div>
    <div class="contentPart__main">
      <div class="contentPart__messagesList">
        {{{messages}}}
      </div>
    </div>

    {{#if showInput}}
      <div class="contentPart__bottom">
      {{{messageForm}}}
      </div>
    {{/if}}

  </div>
</main>
`;

export default chatTmp;
