import { IAuthenticatedRequest } from './auth';

import {
    PaymentMonth,
    PaymentYear,
    PaymentSize,
} from '../../../server-global';

interface IGetPaymentsRequest extends IAuthenticatedRequest { }

interface ISavePaymentRequest extends IAuthenticatedRequest {
    readonly body: Readonly<{
        fullname: string;
        address: string;
        country: string;
        city: string;
        cardNumber: string;
        expiryDateMonth: PaymentMonth;
        expiryDateYear: PaymentYear;
        nameOnCard: string;
        cvv: string;
    }>;
}

interface ICheckoutWithExistingPaymentRequest extends IAuthenticatedRequest {
    readonly body: Readonly<{
        products: ReadonlyArray<{
            id: string;
            size: PaymentSize;
        }>;
        paymentId: string;
    }>;
}

interface ICheckoutWithNewPaymentRequest extends IAuthenticatedRequest {
    readonly body: Readonly<{
        products: ReadonlyArray<{
            id: string;
            size: PaymentSize;
        }>;
        payment: Readonly<{
            fullname: string;
            address: string;
            country: string;
            city: string;
            cardNumber: string;
            expiryDateMonth: PaymentMonth;
            expiryDateYear: PaymentYear;
            nameOnCard: string;
            cvv: string;
        }>;
        save: boolean;
    }>;
}

export {
    IGetPaymentsRequest,
    ISavePaymentRequest,
    ICheckoutWithExistingPaymentRequest,
    ICheckoutWithNewPaymentRequest,
}