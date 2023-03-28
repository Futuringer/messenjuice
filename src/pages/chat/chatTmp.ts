const chatTmp = `
<main class="chat__main">
  <div class="chat__contactsPart">
    <button class="optionsButton">
      <div class="optionsButton__dot"></div>
      <div class="optionsButton__dot"></div>
      <div class="optionsButton__dot"></div>
    </button>
      {{{searchInput}}}
      {{{contacts}}}
  </div>

  <div class="chat__contentPart contentPart">
    <div class="contentPart__top">
      {{{userBadge}}}
    </div>
    <div class="contentPart__main">
      <div class="contentPart__messagesList">
        {{{messages}}}
      </div>
    </div>
    <div class="contentPart__bottom">

    {{{optionsButton}}}
    {{{messageForm}}}
    </div>
  </div>
</main>
`;

export default chatTmp;
