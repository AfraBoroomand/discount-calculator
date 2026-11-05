document.addEventListener("DOMContentLoaded", function () {
  const discountForm = document.getElementById("discount-form");
  const priceInput = document.getElementById("price");
  const discountInput = document.getElementById("discount");
  const includeTaxCheckbox = document.getElementById("include-tax");
  const resultsSection = document.getElementById("results");
  if (!discountForm) return;
  discountForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const originalPrice = parseFloat(priceInput.value);
    const discountPercent = parseFloat(discountInput.value);
    const isTaxIncluded = includeTaxCheckbox.checked;
    if (isNaN(originalPrice) || originalPrice < 0) {
      alert("لطفاً قیمت اصلی معتبر و بزرگ‌تر از صفر وارد کنید.");
      return;
    }
    if (
      isNaN(discountPercent) ||
      discountPercent < 0 ||
      discountPercent > 100
    ) {
      alert("درصد تخفیف باید عددی بین 0 تا 100 باشد.");
      return;
    }
    const discountAmount = (originalPrice * discountPercent) / 100;
    const priceAfterDiscount = originalPrice - discountAmount;
    let taxAmount = 0;
    if (isTaxIncluded) {
      taxAmount = (priceAfterDiscount * 9) / 100;
    }
    const finalPrice = priceAfterDiscount + taxAmount;

    resultsSection.innerHTML = `
      <p>قیمت اولیه: ${originalPrice.toLocaleString("en-US")} تومان</p>
      <p>مبلغ تخفیف: ${discountAmount.toLocaleString("en-US")} تومان</p>
      ${
        isTaxIncluded
          ? `<p>مالیات ارزش افزوده (9%): ${taxAmount.toLocaleString("en-US")} تومان</p>`
          : ""
      }
      <p style="font-weight: 700; margin-top: 8px;">مبلغ نهایی پرداختی: ${finalPrice.toLocaleString("en-US")} تومان</p>
    `;
  });
});
