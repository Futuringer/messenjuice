const inputTmp = `
  <input
    class="input__field {{className}}"
    {{#if isRequired}}
    required=true
    {{/if}}
    name={{name}}
    type={{type}}
    value="{{value}}"
    {{#if disabled}}
    disabled
    placeholder="--"
    {{else}}
    placeholder="{{placeholder}}"
    {{/if}}
  />
`;

export default inputTmp;
