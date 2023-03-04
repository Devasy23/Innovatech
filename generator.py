import random
columns = [
    "REPORTNO", "SHAPE",
    "WEIGHT",    "CUT",
    "POLISH",    "SYMN",
    "COLOR",    "PURITY",
    "FLUOR",    "MES1",
    "MES2",    "MES3",
    "TABLE",
    "DEPTHPER",    "PRICE/CTS",
    "TOTAL",    "VIDEOLINK",
    "PDFLINK",    "CSTATUS",
    "RATIO",    "CERT",]
actual_shape_dict = {'ROUND':'RD', 'RD':'RD', 'R':'RD', 'BR':'RD', 'RB':'RD',
          'ROUND BRILLIANT':'RD','ROUNDBRILLIANT':'RD', 'BRILLIANT':'RD',
          'BRILLIANT CUT':'RD', 'BRILLIANTCUT':'RD', 
          'OVAL':'OV',  'OV':'OV', 'OC':'OV',  'OVEL':'OV', 'OL':'OV', 
          'EMERALD':'EM', 'EM':'EM', 'EMRD':'EM', 'EC':'EM', 
          'CUSHION MODIFIED':'CU', 'CMB':'CU','CM':'CU', 'CS':'CU', 'CUSHIONMODIFIED':'CU',
          'CUSHION':'CU', 'CUS':'CU','CU':'CU',
          'PRINCESS':'PR','PR':'PR','PC':'PR',
          'PEAR':'PS','PAER':'PS', 'PER':'PS', 'PS':'PS',
          'RADIANT':'RA', 'RAD':'RA', 'RA':'RA',          
          'MARQUISE':'MQ', 'MR':'MQ', 'MQ':'MQ', 'MAR':'MQ',
          'ASHCHER':'AS', 'AS':'AS', 'ASSCHER': 'AS',
          'HEART':'HS','HRT':'HS', 'LOVE':'HS', 'HS':'HS', 'HR':'HS', 'HC':'HS',
          'TRIANGLE':'TR', 'TRI': 'TR', 'TR':'TR'}

shape_list = ['RD', 'OV', 'EM', 'CU', 'PR', 'PS', 'RA', 'MQ', 'AS', 'HS', 'TR']
actual_color_dict = {'D':'D', 'E':'E', 'F':'F', 'D-':'D', 'E-':'E', 'F-':'F','D+':'D', 'E+':'E', 'F+':'F',
                     'G':'G', 'H':'H', 'I':'I', 'G-':'G', 'H-':'H', 'I-':'I', 'G+':'G', 'H+':'H', 'I+':'I',
                     'J':'J', 'K':'K', 'L':'L', 'J-':'J', 'K-':'K', 'L-':'L', 'J+':'J', 'K+':'K', 'L+':'L',
                     'M':'M', 'N':'N', 'O':'O', 'M-':'M', 'N-':'N', 'O-':'O', 'M+':'M', 'N+':'N', 'O+':'O',
                     'P':'P', 'Q':'Q', 'P-':'P', 'Q-':'Q', 'Q+':'Q', 'P+':'P',
                     'Q':'Q', 'R':'R', 'S':'S', 'T':'T', 'U':'U', 'V':'V',
                     'W':'W', 'X':'X', 'Y':'Y', 'Z':'Z'}
                     
color_list = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
actual_fluor_dict = {
    'NONE':'N', 'NON':'N', 'N':'N', 'NO':'N', 'NAN':'N',
    'FAINT':'F','FNT':'F', 'FAINT':'F', 'F': 'F',
    'MEDIUM':'M','MED':'M', 'M':'M', 'MEDIUMYELLOW': 'M',
    'STRONG':'S', 'STG':'S', 'S':'S', 'ST':'S', 'STRONGYELLOW':'S',
    'VERY STRONG':'VS', 'VST':'VS', 'VSTG':'VS', 'VS':'VS', 'VERYSTRONG':'VS', 'VERYSTRONGBL': 'VS',
    }
# Fluor Count 5
fluor_list = ['N', 'F', 'M', 'S', 'VS'] 
actual_clarity_dict = {
    'FL':'FL', 'IF':'IF', 'VVS1':'VVS1', 'VVS2':'VVS2', 'VS1':'VS1',
    'FL-':'IF', 'IF-':'IF', 'VVS1-':'VVS1', 'VVS2-':'VVS2', 'VS1-':'VS1',
    'FL+':'IF', 'IF+':'IF', 'VVS1+':'VVS1', 'VVS2+':'VVS2', 'VS1+':'VS1',
    'VS2':'VS2', 'SI1':'SI1', 'SI2':'SI2', 'I1':'', 'I2':'', 'I3':'I3',
    'VS2-':'VS2', 'SI1-':'SI1', 'SI2-':'SI2', 'I1-':'I1', 'I2-':'I2', 'I3-':'I3',
    'VS2+':'VS2', 'SI1+':'SI1', 'SI2+':'SI2', 'I1+':'I1', 'I2+':'I2', 'I3+':'I3'}
# Clarity Count 12
clarity_list = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3', 'PK']
actual_cut_dict = {'EX':'X', 'VG':'VG', 'G': 'G', 'X':'X',
                   'EX-':'X', 'VG-':'VG', 'G-': 'G',
                   'EX+':'X', 'VG+':'VG', 'G+': 'G',
                   'EXCELLENT':'X', 'VERY GOOD': 'VG', 'VERYGOOD': 'VG', 'GOOD': 'G',
                   'F':'F','FAIR':'F','P':'P','POOR':'P',}
# Cut Count 5
cut_list = ['X', 'VG', 'G', 'F', 'P']
actual_polish_dict = {'EX':'X', 'VG':'VG', 'G': 'G', 'X':'X',
                   'EX-':'X', 'VG-':'VG', 'G-': 'G',
                   'EX+':'X', 'VG+':'VG', 'G+': 'G',
                   'EXCELLENT':'X', 'VERY GOOD': 'VG', 'VERYGOOD': 'VG', 'GOOD': 'G',
                   'F':'F','FAIR':'F','P':'P','POOR':'P',}
# Polish Count 5
polish_list = ['X', 'VG', 'G', 'F', 'P']
actual_sym_dict = {'EX':'X', 'VG':'VG', 'G': 'G', 'X':'X',
                   'EX-':'X', 'VG-':'VG', 'G-': 'G',
                   'EX+':'X', 'VG+':'VG', 'G+': 'G',
                   'EXCELLENT':'X', 'VERY GOOD': 'VG', 'VERYGOOD': 'VG', 'GOOD': 'G',
                   'F':'F','FAIR':'F','P':'P','POOR':'P',}
# Symmetry Count 5
sym_list = ['X', 'VG', 'G', 'F', 'P']

def generate_questions():
    '''Can you show me a pair of oval diamonds, each weighing 1.75 ct with VVS1 clarity, F color, and Good cut?
    I'm looking for a pair of cushion cut diamonds, each weighing 1.5 ct with VS2 clarity, G color, and Very Good cut.
    Can you find me a single marquise diamond with 2 ct weight, VVS2 clarity, E color, and Excellent cut?
    I need a pair of RBs, each weighing 1.25 ct with VS1 clarity, J color, and Good cut.
    Can you show me a pair of princess cut diamonds, each weighing 1.75 ct with VVS2 clarity, E color, and Very Good cut?
    P emd 1-2ct ovl vs g-k
    L pear 1.5-2.5ct vvs d-j vg+
    RB 1-1.5ct vs1+ ex ex d-f
    ECU 2-3ct vs2 h-j ex ex none
    MR 0.5-1ct si2+ d-h vg+
    PS 1-1.5ct vs1+ ex ex g-k
    emd 2-3ct vs2+ d-k vg+
    ASSC 1-2ct si2+ d-k ex ex none
    O emd 0.75-1.25ct vs1+ ex ex d-j
    H pear 1-2ct si2+ d-h ex ex none
    P emd 2-3ct ov vs2 ex d-f vg+
    MR 1-1.5ct si1+ ex ex g-k
    RB 0.5-1ct vs2+ ex ex d-f
    C emd 1-2ct vs2+ d-k vg+
    ASSC 2-3ct si1+ d-k ex ex none
    PS 0.5-1ct vs1+ ex ex d-f
    L pear 1-1.5ct si2+ ex ex d-j
    O emd 1-2ct vs1+ ex ex g-k
    H oval 1.5-2ct vs2 ex ex d-f vg+
    ECU 1-1.5ct vvs d-j ex ex none
    RB 2-3ct vs1 ex ex d-f
    MR 2-2.5ct si1+ d-h ex ex none
    P emd 1ct+ vs2+ d-k ex ex none
    PS 2-3ct vs2+ d-k ex ex none
    C emd 1ct+ si1+ d-k ex ex none
    H pear 2-3ct vs1+ ex ex d-k
    L marq 1-2ct vs2+ d-k ex ex none
    RB 1.5-2ct si1+ d-f ex ex none
    ECU 1ct+ vs1 ex ex d-k
    O emd 2-2.5ct vs2+ ex ex d-k vg+
    '''
    questions = []
    for i in range(100):
        questions.append(generate_question())
    return questions

def generate_question():
    question = {}
    question['shape'] = random.choice(shape_list)
    question['carat'] = random.choice(carat_list)
    question['color'] = random.choice(color_list)
    question['clarity'] = random.choice(clarity_list)
    question['cut'] = random.choice(cut_list)
    question['polish'] = random.choice(polish_list)
    question['sym'] = random.choice(sym_list)
    return question

def generate_question_string(question):
    question_string = ''
    question_string += 'Can you show me a '
    question_string += question['shape']
    question_string += ' diamond, weighing '
    question_string += question['carat']
    question_string += ' with '
    question_string += question['clarity']
    question_string += ' clarity, '
    question_string += question['color']
    question_string += ' color, and '
    question_string += question['cut']
    question_string += ' cut?'
    return question_string
 
 
def generate_answer(question):
    answer = {}
    answer['shape'] = question['shape']
    answer['carat'] = question['carat']
    answer['color'] = question['color']
    answer['clarity'] = question['clarity']
    answer['cut'] = question['cut']
    answer['polish'] = question['polish']
    answer['sym'] = question['sym']
    return answer

# run the program
if __name__ == '__main__':
    questions = generate_questions()
    for question in questions:
        question_string = generate_question_string(question)
        answer = generate_answer(question)
        print(question_string)
        print(answer)
