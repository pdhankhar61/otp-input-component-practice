## OTP Input Component Practice

- It has all features like `Forward` and `Backward` auto `Jumping`.
- It has better `Paste (Ctrl+v)` feature. If you paste by selecting any input field it will work as expected. Many websites don't have this feature.

- Raise issue if found any bug.
- Test it here, https://otp-input-component-practice.netlify.app

### Questions ?

Why `onInput` is used not `onChange`?

- Because `onChange` will not run if user enters same value.

Why `parseInt` has been used ?

- isNaN was considering `" "` and `""` as numbers.
