# sample = {
#     "user": "Ada",
#     "planted":
#     ["I feel pretty good about myself today, I think I can handle a ton of work", 
#      "I'm not too sure how to feel about this, I think I've just been too stressed overall and I want to change gears",
#      "Pink",
#      "I think that if I realy applied myself, there might be something worth to this after all - I'm just not sure."]}

color_fills = ["#E9E2D0", "#EA9085", "#D45D79", "#6E5773"]

svg_response = '''
 <path fill="'''+ color_fills[0] + '''" stroke="#333333" stroke-width="0" 
                    d="M0,0 q50,-25 100,0 q-50,25 -100,0 q-50,25 -100,0 q50,-25 100,0"/>	
              <path fill="''' + color_fills[1] + '''" stroke="#333333" stroke-width="0" d="M0,0 q53.03,-17.68 70.71,-70.71 q-53.03,17.68 -70.71,70.71 q-53.03,17.68 -70.71,70.71 q53.03,-17.68 70.71,-70.71"/>
              <path fill="'''+ color_fills[2] + '''" stroke="#333333" stroke-width="0" d="M0,0 q25,-50 0,-100 q-25,50 0,100 q-25,50 0,100 q25,-50 0,-100"/>
              <path fill="'''+ color_fills[3] + '''" stroke="#333333" stroke-width="0" d="M0,0 q-17.68,-53.03 -70.71,-70.71 q17.68,53.03 70.71,70.71 q17.68,53.03 70.71,70.71 q-17.68,-53.03 -70.71,-70.71"/>
'''
