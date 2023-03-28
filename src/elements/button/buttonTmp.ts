const buttonTmp = `
{{#if isActive}}
  <button class="button button_active_{{variant}} {{className}}" type={{type}}>
      {{text}}
      {{#if icon}}
        <img class="button__icon" src={{icon}} alt=''>
      {{/if}}
  </button>
{{else}}
  {{#if disabled}}
    <button class="button button_{{variant}} {{className}}" type={{type}} disabled>
        {{{text}}}
        <img class="button__icon" src={{icon}} alt=''>
    </button>
  {{else}}
    <button class="button button_{{variant}} {{className}}" type={{type}}>
      {{{text}}}
      {{#if icon}}
        <img class="button__icon" src={{icon}} alt=''>
      {{/if}}
    </button>
  {{/if}}
{{/if}}
`;

export default buttonTmp;
