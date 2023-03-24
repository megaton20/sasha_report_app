function populate(s1, s2) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);

    // to create an empty list
    s2.innerHTML = "Select Country";
    if (s1.value == 'Akwa Ibom') {
        var optionArray = ['abak|Abak ', 'eastern obolo|Eastern Obolo', 'eket|Eket', 'esit eket|Esit Eket', 'essien udim|Essien Udim', 'etim ekpo|Etim Ekpo', 'etinan |Etinan ', 'ibesikpo asutan|Ibesikpo Asutan',
            'ibeno |lbeno ', 'ibiono ibom|lbiono lbom', 'lka|lka', 'ikono|lkono', 'ikot abasi|lkot Abasi', 'ikot epene|lkot Epene', 'inl|lnl', 'itu|ltu', 'mbo|Mbo', 'mkpat enin|Mkpat Enin', 'nsit atai|Nsit Atai',
            'nsit ibom|Nsit lbom ', 'Nsit Ubium|Nsit Ubium ', 'obot akara|Obot Akara', 'okobo|Okobo ', 'onna |Onna ', 'oron |Oron', 'oruk anam|Oruk Anam', 'udung uko|Udung Uko', 'ukanafun |Ukanafun ', 'uruan|Uruan ',
            'urue-offong|Urue-Offong', 'uyo|Uyo '
        ];
    } else if (s1.value == 'Cross River') {
        var optionArray = ['abi|Abi', 'akamkpa|Akamkpa', 'akpabuyo |Akpabuyo', 'bakassi|Bakassi', 'bekwarra|Bekwarra', 'biase|Biase', 'boki|Boki', 'calabar municipal |Calabar Municipal',
            'calabar south|Calabar South', 'etung |Etung ', 'ikom |Ikom ', 'obanliku|Obanliku', 'obubra |Obubra ', 'obudu|Obudu ', 'odukpani|Odukpani', 'ogoja |Ogoja ', 'yakurr|Yakurr  ', 'yala|Yala'
        ];
    } else if (s1.value == 'Lagos') {
        var optionArray = ['alimosho|Alimosho', 'ajeromi-ifelodun|Ajeromi-Ifelodun', 'kosofe|Kosofe', 'mushin|Mushin', 'oshodi-isolo|Oshodi-Isolo', 'ojo|Ojo', 'ikorodu|Ikorodu', 'surulere|Surulere', 'agege|Agege',
            'ifako-ijaiye|Ifako-Ijaiye', 'somolu|Somolu', 'amuwo-odofin|Amuwo-Odofin', 'lagos mainland|Lagos Mainland', 'ikeja|Ikeja', 'eti-osa|Eti-Osa', 'badagry|Badagry', 'apapa|Apapa', 'lagos island|Lagos Island',
            'epe|Epe', 'ibeju-lekki|Ibeju-Lekki'
        ];
    } else if (s1.value == 'Abuja') {
        var optionArray = ['gwagwalada|Gwagwalada', 'kuje|Kuje', 'abaji|Abaji', 'abuja municipal|Abuja municipal', 'bwari| Bwari', 'kwali|Kwali'];
    } else if (s1.value == 'Port Harcourt') {
        var optionArray = ['abua-odual|Abua-Odual', 'ahoada east|Ahoada East', 'ahoada west|Ahoada West', 'akuku toru|Akuku Toru', 'adoni|Andoni', 'asari-toru|Asari-Toru', 'bonny|Bonny', 'degema |Degema',
            'eleme |Eleme ', 'Emohua |Emohua ', 'Etche |Etche ', 'Gokana |Gokana ', 'ikwerre |Ikwerre ', 'khana |Khana ', 'obio akpor|Obio Akpor', 'ogba/egbema/ndoni| Ogba/Egbema/Ndoni', 'ogu/bolo| Ogu/Bolo', 'okrika |Okrika ',
            'omuma |Omuma ', 'opobo-nkoro|Opobo-Nkoro', 'oyigbo |Oyigbo ', 'port-harcourt |Port-Harcourt', 'tai |Tai '
        ];
    }

    for (var option in optionArray) {
        var pair = optionArray[option].split("|");
        var newOption = document.createElement("option");

        newOption.value = pair[0];
        newOption.innerHTML = pair[1];
        s2.options.add(newOption);
    }
}