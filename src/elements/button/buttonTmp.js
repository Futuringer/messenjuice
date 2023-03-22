const buttonTmp = `
{{#if isActive}}
  <button class="button button_active" type={{type}}>
    {{text}}
  </button>
{{else}}
  <button class="button" type={{type}}>
    {{text}}
  </button>
{{/if}}
`;

export default buttonTmp;
