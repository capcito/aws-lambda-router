// Type definitions for aws-lambda-router
// Project: github.com/spring-media/aws-lambda-router
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';

export function handler(routeConfig: RouteConfig): any;

export interface AWSLamdaRouterRequest<BODY = any, PATHS = any> extends APIGatewayProxyEvent
{
  parsedBody: BODY;
  paths: PATHS;
}

export interface ProxyIntegrationRoute {
    path: string;
    method: Method;
    onError?: (request: AWSLamdaRouterRequest, context: Context, error: Error) => APIGatewayProxyResult;
    action: (request: AWSLamdaRouterRequest, context: Context) => any;
}

export interface ProxyIntegrationConfig {
    cors: boolean;
    routes: ProxyIntegrationRoute[];
    debug?: boolean;
    errorMapping?: any;
    defaultHeaders?: string;
    proxyPath?: string;
}

export interface SnsRoute {
    subject: RegExp;
    action: (sns: any, context: any) => any;
}

export interface SnsConfig {
    routes: SnsRoute[];
    debug?: boolean;
}

export interface SqsRoute {
    source: string | RegExp;
    action: (messages: any[], context: any) => any;
}

export interface SqsConfig {
    routes: SqsRoute[];
    debug?: boolean;
}

export interface S3Route {
    bucketName?: string | RegExp;
    eventName?: string | RegExp;
    objectKeyPrefix?: string;
    action: (s3Record: any, context: any) => any;
}

export interface S3Config {
    routes: S3Route[];
    debug?: boolean;
}

export interface RouteConfig {
    proxyIntegration?: ProxyIntegrationConfig;
    sns?: SnsConfig;
    sqs?: SqsConfig;
    s3?: S3Config;
}

export interface HttpError<T = any> extends Error {
    status: number
    body?: T
}

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
