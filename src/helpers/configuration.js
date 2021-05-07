function getAvailableSheetExtensions(types){
  //ex accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
  let typesAccept = types.map(function(value){
      return " .".concat(value);
  });
  return typesAccept.toString(); //String - List of available extensions (.csv, .xlss)
}
/* eslint-disable no-sparse-arrays */

const wordsNotAllowed = ["ANUS", "-NUS", "BABA-OVO", "BABAOVO", "BABACA", "BACURA", "BAGOS", "BAITOLA", "BEBUM", "BESTA", "BICHA", "BISCA", "BIXA",
"BOAZUDA", "BOCETA", "BOCO", "BOC+", "BOIOLA", "BOLAGATO", "BOQUETE", "BOLCAT", "BOSSETA", "BOSTA", "BOSTANA", "BRECHA",
"BREXA", "BRIOCO", "BRONHA", "BUCA", "BUCETA", "BUNDA", "BUNDUDA", "BURRA", "BURRO", "BUSSETA", "CACHORRA", "CACHORRO",
"CADELA", "CAGA", "CAGADO", "CAGAO", "CAGONA", "CANALHA", "CARALHO", "CASSETA", "CASSETE", "CHECHECA", "CHERECA", "CHIBUMBA",
"CHIBUMBO", "CHIFRUDA", "CHIFRUDO", "CHOTA", "CHOCHOTA", "CHUPADA", "CHUPADO", "CLITORIS", "CLIT+RIS", "COCAINA", "COCA-NA",
"COCO", "COC+", "CORNA", "CORNO", "CORNUDA", "CORNUDO", "CORRUPTA", "CORRUPTO", "CRETINA", "CRETINO", "CRUZ-CREDO", "CU",
"C+", "CULHAO", "CULH+O", "CULH+ES", "CURALHO", "CUZAO", "CUZ+O", "CUZUDA", "CUZUDO", "DEBIL", "DEBILOIDE", "DEFUNTO", "DEMONIO",
"DEM+NIO", "DIFUNTO", "DOIDA", "DOIDO", "EGUA", "+GUA", "ESCROTA", "ESCROTO", "ESPORRADA", "ESPORRADO", "ESPORRO", "ESP+RRO",
"ESTUPIDA", "EST+PIDA", "ESTUPIDEZ", "ESTUPIDO", "EST+PIDO", "FEDIDA", "FEDIDO", "FEDOR", "FEDORENTA", "FEIA", "FEIO", "FEIOSA",
"FEIOSO", "FEIOZA", "FEIOZO", "FELACAO", "FELAŠ+O", "FENDA", "FODA", "FODAO", "FOD+O", "FODE", "FODIDA", "FODIDO", "FORNICA",
"FUDENDO", "FUDECAO", "FUDEŠ+O", "FUDIDA", "FUDEO", "FUDEU", ,"FUDER", "FUDIDO", "FURADA", "FURADO", "FURAO", "FUR+O", "FURNICA", "FURNICAR", "FURO",
"FURONA", "GAIATA", "GAIATO", "GAY", "GONORREA", "GONORREIA", "GOSMA", "GOSMENTA", "GOSMENTO", "GRELINHO", "GRELO", "HOMO-SEXUAL",
"HOMOSEXUAL", "HOMOSSEXUAL", "IDIOTA", "IDIOTICE", "IMBECIL", "ISCROTA", "ISCROTO", "JAPA", "LADRA", "LADRAO", "LADR+O", "LADROEIRA",
"LADRONA", "LALAU", "LEPROSA", "LEPROSO", "LESBICA", "L+SBICA", "MACACA", "MACACO", "MACHONA", "MACHORRA", "MANGUACA", "MANGUAŠA",
"MASTURBA", "MELECA", "MERDA", "MIJA", "MIJADA", "MIJADO", "MIJO", "MOCREA", "MOCR+A", "MOCREIA", "MOCR+IA", "MOLECA", "MOLEQUE",
"MONDRONGA", "MONDRONGO", "NABA", "NADEGA", "NOJEIRA", "NOJENTA", "NOJENTO", "NOJO", "OLHOTA", "OTARIA", "OT-RIA", "OTARIO", "OT-RIO",
"PACA", "PASPALHA", "PASPALHAO", "PASPALHO", "PAU", "PEIA", "PEIDO", "PEMBA", "PENIS", "P-NIS", "PENTELHA", "PENTELHO", "PERERECA",
"PERU", "PER+", "PICA", "PICAO", "PIC+O", "PILANTRA", "PIRANHA", "PIROCA", "PIROCO", "PIRU", "PORRA", "PREGA", "PROSTIBULO", "PROST-BULO",
"PROSTITUTA", "PROSTITUTO", "PUNHETA", "PUNHETAO", "PUNHET+O", "PUS", "PUSTULA", "P+STULA", "PUTA", "PUTO", "PUXA-SACO", "PUXASACO",
"RABAO", "RAB+O", "RABO", "RABUDA", "RABUDAO", "RABUD+O", "RABUDO", "RABUDONA", "RACHA", "RACHADA", "RACHADAO", "RACHAD+O", "RACHADINHA",
"RACHADINHO", "RACHADO", "RAMELA", "REMELA", "RETARDADA", "RETARDADO", "RIDICULA", "RID-CULA", "ROLA", "ROLINHA", "ROSCA", "SACANA",
"SAFADA", "SAFADO", "SAPATAO", "SAPAT+O", "SIFILIS", "S-FILIS", "SIRIRICA", "TARADA", "TARADO", "TESTUDA", "TEZAO", "TEZ+O", "TEZUDA",
"TEZUDO", "TROCHA", "TROLHA", "TROUCHA", "TROUXA", "TROXA", "VACA", "VAGABUNDA", "VAGABUNDO", "VAGINA", "VEADA", "VEADAO", "VEAD+O",
"VEADO", "VIADA", "VIADO", "VIADAO", "VIAD+O", "XAVASCA", "XERERECA", "XEXECA", "XIBIU", "XIBUMBA", "XOTA","XOCHOTA", "XOXOTA", "XANA", "XANINHA"];

function wordIsAllowed(wordTarget) {
  let allowed = true;
  let wordTargetMapped = wordTarget.trim();
  wordTargetMapped = wordTargetMapped.toUpperCase();
  const wordTargetMappedList = wordTargetMapped.split(" ");
  wordsNotAllowed.forEach(actualNotAllowedWord => {
      wordTargetMappedList.forEach(actualWordTarget => {
          if (actualWordTarget === actualNotAllowedWord) {
              allowed = false;
              return;
          }
      });
  });
  return allowed;
};

export { wordIsAllowed, getAvailableSheetExtensions } ;
