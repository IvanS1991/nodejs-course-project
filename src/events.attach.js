// SHOW HIDDEN FORM
$('#toggle-password-form, .collection-add-display').on('click', (e) => {
  const $this = $(e.target);
  const $next = $this.next();
  $this.toggleClass('hidden');
  $next.toggleClass('hidden');
});

// ENCRYPT PASSWORD
$('.user-form').on('submit', () => {
  const pass = $('#tb-password').val();
  const passRepeat = $('#tb-password-repeat').val();
  $('#tb-password-secure').val(sha1(pass));
  $('#tb-password-repeat-secure').val(sha1(passRepeat));
});
