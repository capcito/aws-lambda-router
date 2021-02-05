import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ProcessMethod } from './EventProcessor';
import { CorsOptions } from './cors';
declare type ProxyIntegrationParams = {
    paths?: {
        [paramId: string]: string;
    };
    routePath?: string;
};
declare type ProxyIntegrationBody<T = any> = {
    parsedBody?: T;
};
declare type ErrorHandler = (error?: Error, request?: APIGatewayProxyEvent, context?: APIGatewayEventRequestContext) => Promise<APIGatewayProxyResult | void> | APIGatewayProxyResult | void;
export declare type ProxyIntegrationEvent<T = any> = APIGatewayProxyEvent & ProxyIntegrationParams & ProxyIntegrationBody<T>;
export declare type ProxyIntegrationResult = Omit<APIGatewayProxyResult, 'statusCode'> & {
    statusCode?: APIGatewayProxyResult['statusCode'];
};
export interface ProxyIntegrationRoute {
    path: string;
    method: string;
    action: (request: ProxyIntegrationEvent<any>, context: APIGatewayEventRequestContext) => ProxyIntegrationResult | Promise<ProxyIntegrationResult> | any | Promise<any>;
}
export declare type ProxyIntegrationErrorMapping = {
    [reason: string]: APIGatewayProxyResult['statusCode'];
};
export declare type ProxyIntegrationError = {
    statusCode: APIGatewayProxyResult['statusCode'];
    message: string;
} | {
    reason: string;
    message: string;
};
export interface ProxyIntegrationConfig {
    onError?: ErrorHandler;
    cors?: CorsOptions | boolean;
    routes: ProxyIntegrationRoute[];
    debug?: boolean;
    errorMapping?: ProxyIntegrationErrorMapping;
    defaultHeaders?: APIGatewayProxyResult['headers'];
    proxyPath?: string;
}
export declare const process: ProcessMethod<ProxyIntegrationConfig, APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult>;
export {};
