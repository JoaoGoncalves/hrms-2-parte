import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Constants } from '../constants';

export const addApiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const constants = inject(Constants);
  const url = req.url;

  const newUrl = constants.apiUrl + url;
  const newReq = req.clone({url: newUrl})

  return next(newReq);
};
