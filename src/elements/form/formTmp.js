module.exports= formTmp = `
<form class="form" name="{{formName}}">
  <h1 class="form__header">{{formText}}</h1>

  {{#if singleColumn}}
  <div class="form__inputs-container">
    {{#each inputs}}
      {{>input}}
    {{/each}}
  </div>

  {{else}}
    <div class="form__inputs-container form__inputs-container_two-columns">
    {{#each inputs}}
      {{>input}}
    {{/each}}
  </div>
  {{/if}}
  
  <div class="form__buttons-container">
    {{#each buttons}}
      {{>button}}
    {{/each}}
  </div>

  {{#if descriptionText}}
    <p class="form__description">
      {{descriptionText}}
      <a class="form__description-link" href={{descriptionLink}}>{{descriptionLinkText}}</a>
    </p>
  {{/if}}
</form>
`;

