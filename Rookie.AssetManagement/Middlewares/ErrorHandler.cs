using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Rookie.AssetManagement.Contracts;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Middlewares
{
    public class ErrorHandler
    {
        private readonly RequestDelegate _next;

        public ErrorHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                var response = context.Response;
                response.ContentType = "application/json";

                string errMessage;

                switch (error)
                {
                    case NotFoundException e:
                        response.StatusCode = (int)HttpStatusCode.NotFound;
                        errMessage = error.Message;
                        break;

                    case ErrorException errorException:
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        errMessage = error.Message;
                        break;

                    default:
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        errMessage = "Something go wrong";
                        break;
                }

                var result = JsonConvert.SerializeObject(new { error = true, message = errMessage });

                await response.WriteAsync(result);
            }
        }
    }
}