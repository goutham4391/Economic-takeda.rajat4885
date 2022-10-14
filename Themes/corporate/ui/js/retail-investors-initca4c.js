document.addEventListener('DOMContentLoaded', () => {
    const triggerButton = document.querySelector('[data-epiforms-metadata="ir_subscription_trigger"] [type="submit"]');
    if (triggerButton)
        triggerButton.classList.remove('FormSubmitButton');

    handleSubscriptionValidation();

    function handleSubscriptionValidation() {
        const subscriptionForm = document.querySelector('[data-epiforms-metadata="ir_subscription"]');
        if (!subscriptionForm) return;

        const subscriptionSubmit = subscriptionForm.querySelector('.FormSubmitButton');
        if (!subscriptionSubmit) return;

        subscriptionSubmit.addEventListener('click', function (event) {
            const choiceElems = subscriptionForm.querySelectorAll('.FormChoice');
            if (!choiceElems || choiceElems.length === 0) return;

            for (const el of choiceElems) {
                const groupData = el.querySelector('.js-radio-elements');
                if (!groupData) continue;

                const groupElems = groupData.getAttribute('data-radio-elements').split(',');
                const groupRequired = groupData.getAttribute('data-group-required');
                const requiredMsg = groupData.getAttribute('data-required-message');
                if (!groupElems || groupElems.length === 0) continue;
                if (groupRequired.toLowerCase() !== 'true') continue;

                let arr = [];
                for (const groupElem of groupElems) {
                    const e = subscriptionForm.querySelector(`.FormChoice [data-name=${groupElem}]`);
                    if (!e) continue;

                    arr.push(e);
                }

                let selected = false;
                for (const e of arr) {
                    if (e.checked) {
                        selected = true;
                        break;
                    }
                }

                const errorMsg = el.querySelector('.Form__Element__ValidationError');
                if (!selected) {
                    errorMsg.style.display = 'block';
                    errorMsg.innerHTML = requiredMsg;
                    event.preventDefault();
                    event.stopImmediatePropagation();
                } else {
                    errorMsg.style.display = 'none';
                    errorMsg.innerHTML = '';
                }
            }
        });
    }
});