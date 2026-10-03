# Senaryo modeli: Kurulum + aylık abonelik. Tüm satış adetleri ve fiyatlar VARSAYIMDIR.
FIXED={'A_yan_is':3593+834.50+1500,'B_tam_zamanli':3593+834.50+1500+10156.73}
PAY=0.03; INFRA=50
S={
 'Kötümser':dict(price=690,setup=1500,new=[0,0,1,0,1,0,1,0,1,0,1,0],churn=0.08,sales_h=25,onb_h=6,sup_h=1.5,maint_h=15),
 'Orta':    dict(price=990,setup=2500,new=[1,1,1]+[2]*9,churn=0.04,sales_h=14,onb_h=5,sup_h=1.0,maint_h=12),
 'İyimser': dict(price=1490,setup=3500,new=[2,2,2]+[5]*9,churn=0.025,sales_h=8,onb_h=4,sup_h=0.75,maint_h=10),
}
out={}
for k,s in S.items():
    active=0.0; rev=0; var=0; hours=0; months=[]
    for m,n in enumerate(s['new']):
        active=active*(1-s['churn'])+n
        r=active*s['price']+n*s['setup']
        v=r*PAY+active*INFRA
        h=n*(s['sales_h']+s['onb_h'])+active*s['sup_h']+s['maint_h']
        rev+=r; var+=v; hours+=h; months.append((m+1,round(active,1),round(r),round(h)))
    contrib=rev-var
    per_cust=s['price']*(1-PAY)-INFRA
    life=1/s['churn']
    cac_h=s['sales_h']+s['onb_h']
    print(f"== {k}: fiyat {s['price']} TL/ay + kurulum {s['setup']} | toplam yeni müşteri {sum(s['new'])} | 12. ay aktif {months[-1][1]} | 12. ay MRR {round(months[-1][1]*s['price'])} TL")
    print(f"   12 ay ciro {round(rev)} | değişken {round(var)} | nakit katkı {round(contrib)} | çalışma saati (geliştirme hariç) {round(hours)} | ortalama saat/ay {round(hours/12)}")
    for f,fx in FIXED.items():
        net=contrib-12*fx
        print(f"   [{f}] sabit/ay {round(fx)} | 12 ay net nakit {round(net)} | saat başı net {round(net/hours)} TL | başabaş aktif müşteri {fx/per_cust:.1f}")
    print(f"   müşteri başı aylık katkı {round(per_cust)} TL | ort. ömür {life:.1f} ay | müşteri başı edinme+kurulum saati {cac_h}")
    out[k]=months
# founder target: net asgari ücret karşılığı
NET_ASGARI=28075.50
for k,s in S.items():
    per_cust=s['price']*(1-PAY)-INFRA
    for f,fx in FIXED.items():
        print(f"Kurucuya ayda net asgari ücret ({NET_ASGARI}) bırakmak için gereken aktif müşteri [{k} fiyatı, {f}]: {(fx+NET_ASGARI)/per_cust:.0f}")
