﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AdvanceMYS.Controllers
{
    public class ManageYourSelfController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
