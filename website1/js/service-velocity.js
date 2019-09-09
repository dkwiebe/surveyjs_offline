function paymentWarnings(client, jdfObject, defaultPaymentObject) {

    let warning = false;
    let warning_message = [];

    if (client.source_data !== null && client.source_data.MULTI_USE) {
        console.log("MULTI_USE: '" + client.source_data.MULTI_USE + "'");
        if (client.source_data.MULTI_USE === false) {
            jdfObject.html('<i class="fas fa-exclamation-triangle text-danger"></i>');
            warning = true;
            warning_message.push('No JDF Multi-Use account on file.');
        } else {
            jdfObject.html('<i class="fas fa-check-square text-success"></i>');
        }
    }

    if (client.source_data !== null && client.source_data.DEFAULT_AGENCY) {
        console.log("DEFAULT_AGENCY: '" + client.source_data.DEFAULT_AGENCY + "'");
        if (client.source_data.DEFAULT_AGENCY === "C") {
            defaultPaymentObject.text("Cash / Cheque");
            warning_message.push('Default payment code C.');
            warning = true;
        } else if (client.source_data.DEFAULT_AGENCY === "2") {
            defaultPaymentObject.text("Cash / Cheque");
            warning_message.push('Default payment code 2.');
            warning = true;
        } else if (client.source_data.DEFAULT_AGENCY === "9") {
            defaultPaymentObject.text("JDF Multi-Use");
        } else if (client.source_data.DEFAULT_AGENCY === "") {
            defaultPaymentObject.text("None Specified");
            warning_message.push('No default payment method.');
            warning = true;
        } else {
            defaultPaymentObject.text("Please lookup in IntelliDealer.");
            warning_message.push('Unsure on the default payment method.  Please confirm and contact support to adjust.');
            warning = true;
        }
    }

    if (warning) {
        console.log('Warn about lack of payment.');
        let span = document.createElement("span");
        let message = '<h2>' + client.customer_number + ' - ' + client.customer_name + '</h2>';
        for (let i in warning_message) {
            message += '<i class="fas fa-exclamation-triangle text-danger"></i> ' + warning_message[i] + '<br>';
        }
        span.innerHTML = message;
        swal({
            title: 'Payment Warning',
            content: span,
            icon: 'warning'
        });
    }

}
