﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Contracts.Dtos.AuthDtos
{
    public class ChangePasswordErrorDto
    {
        public string PasswordOld { get; set; } = "";
        public string PasswordNew { get; set; } = "";

    }
}
